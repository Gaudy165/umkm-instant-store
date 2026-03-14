import { collection, addDoc, getDoc, getDocs, doc, query, where, Timestamp } from "firebase/firestore";
import { db } from "./firestore";
import { Store, StoreInput } from "@/types/store";
import { Product } from "@/types/product";

// Helper to convert Firebase Timestamp/Date to ISO string for serialization
const sanitizeData = (data: any) => {
  const result = { ...data };
  for (const key in result) {
    if (result[key] instanceof Timestamp) {
      result[key] = result[key].toDate().toISOString();
    } else if (result[key] instanceof Date) {
      result[key] = result[key].toISOString();
    }
  }
  return result;
};

export async function createStore(data: StoreInput, userId?: string): Promise<string> {
  const { products, ...storeData } = data;

  // Create the store document first
  const storeRef = await addDoc(collection(db, "stores"), {
    ...storeData,
    ownerId: userId || null,
    createdAt: new Date(),
  });

  // Then add each product to the subcollection
  if (products && Array.isArray(products)) {
    const productsRef = collection(db, "stores", storeRef.id, "products");
    for (const product of products) {
      await addDoc(productsRef, {
        ...product,
        createdAt: new Date(),
      });
    }
  }

  return storeRef.id;
}

export async function getStores(): Promise<Store[]> {
  const querySnapshot = await getDocs(collection(db, "stores"));
  const stores: Store[] = [];

  for (const storeDoc of querySnapshot.docs) {
    const rawData = storeDoc.data();
    const storeData = sanitizeData(rawData);
    
    // Fetch products subcollection for each store
    const productsSnapshot = await getDocs(
      collection(db, "stores", storeDoc.id, "products"),
    );
    const products = productsSnapshot.docs.map((pDoc) => ({
      id: pDoc.id,
      ...sanitizeData(pDoc.data()),
    })) as Product[];

    stores.push({
      id: storeDoc.id,
      ...storeData,
      name: storeData.name,
      products,
    } as Store);
  }

  return stores;
}

export async function getStore(id: string): Promise<Store | null> {
  if (!id) return null;
  const docRef = doc(db, "stores", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    // Fetch products subcollection
    const productsSnapshot = await getDocs(
      collection(db, "stores", id, "products"),
    );
    const products = productsSnapshot.docs.map((pDoc) => ({
      id: pDoc.id,
      ...sanitizeData(pDoc.data()),
    })) as Product[];

    const storeData = sanitizeData(docSnap.data());
    return {
      id: docSnap.id,
      ...storeData,
      name: storeData.name,
      products,
    } as Store;
  } else {
    return null;
  }
}

export async function getStoresByOwner(userId: string): Promise<Store[]> {
  const q = query(collection(db, "stores"), where("ownerId", "==", userId));
  const querySnapshot = await getDocs(q);
  const stores: Store[] = [];

  for (const storeDoc of querySnapshot.docs) {
    const storeData = sanitizeData(storeDoc.data());
    const productsSnapshot = await getDocs(
      collection(db, "stores", storeDoc.id, "products"),
    );
    const products = productsSnapshot.docs.map((pDoc) => ({
      id: pDoc.id,
      ...sanitizeData(pDoc.data()),
    })) as Product[];

    stores.push({
      id: storeDoc.id,
      ...storeData,
      name: storeData.name,
      products,
    } as Store);
  }

  return stores;
}

export async function updateProductPrice(storeId: string, productId: string, newPrice: number): Promise<void> {
  const { updateDoc } = await import("firebase/firestore");
  const productRef = doc(db, "stores", storeId, "products", productId);
  await updateDoc(productRef, {
    price: newPrice,
    updatedAt: new Date(),
  });
}
