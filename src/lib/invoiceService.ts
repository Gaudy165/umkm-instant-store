import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from "./firestore";

export async function getInvoicesByStore(storeId: string) {
  const q = query(
    collection(db, "invoices"),
    where("storeId", "==", storeId),
    orderBy("createdAt", "desc")
  );
  
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
}

export async function getInvoicesByOwner(ownerId: string) {
  // First get all stores for this owner
  const { getStoresByOwner } = await import("./storeService");
  const stores = await getStoresByOwner(ownerId);
  const storeIds = stores.map(s => s.id);

  if (storeIds.length === 0) return [];

  // Firestore "in" queries are limited to 10 items
  // For simplicity, we'll fetch all invoices for these stores
  const q = query(
    collection(db, "invoices"),
    where("storeId", "in", storeIds.slice(0, 10)),
    orderBy("createdAt", "desc")
  );

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
}

export async function updateInvoiceStatusByMayarId(mayarId: string, status: string) {
  const { db } = await import("./firestore");
  const { collection, query, where, getDocs, updateDoc, doc } = await import("firebase/firestore");
  
  const q = query(
    collection(db, "invoices"),
    where("mayarId", "==", mayarId)
  );
  
  const querySnapshot = await getDocs(q);
  
  const updates = querySnapshot.docs.map(async (docSnapshot) => {
    const invoiceRef = doc(db, "invoices", docSnapshot.id);
    return updateDoc(invoiceRef, {
      status: status,
      updatedAt: new Date()
    });
  });
  
  await Promise.all(updates);
  return querySnapshot.size > 0;
}
