import { collection, addDoc, getDoc, getDocs, doc } from "firebase/firestore";
import { db } from "./firestore";

export async function createStore(data: any, userId?: string) {
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

export async function getStores() {
  const querySnapshot = await getDocs(collection(db, "stores"));
  const stores = [];

  for (const storeDoc of querySnapshot.docs) {
    const storeData = storeDoc.data();
    // Fetch products subcollection for each store
    const productsSnapshot = await getDocs(
      collection(db, "stores", storeDoc.id, "products"),
    );
    const products = productsSnapshot.docs.map((pDoc) => ({
      id: pDoc.id,
      ...pDoc.data(),
    }));

    stores.push({
      id: storeDoc.id,
      ...storeData,
      products,
    });
  }

  return stores;
}

export async function getStore(id: string) {
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
      ...pDoc.data(),
    }));

    return {
      id: docSnap.id,
      ...docSnap.data(),
      products,
    };
  } else {
    return null;
  }
}
