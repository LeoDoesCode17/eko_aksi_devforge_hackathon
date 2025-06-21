import { addDoc, deleteDoc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../firebaseClient";
import { get as getTransactionById } from "./transaction-collection";
import { get as getWasteTypeById } from "./waste_types-collection";
/*
TransactionItem
- id (PK)
- transaction_id (FK -> TRANSACTIONS.id)
- waste_type_id (FK -> WASTE_TYPES.id)
- weight_kg (double)
- subtotal_point (double)
- created_at
- updated_at
*/
const COLLECTION_NAME = 'transaction_items'
const colRef = collection(db, COLLECTION_NAME)

export const create = async (transactionId, wasteTypeId, weightKg) => {
  await getTransactionById(transactionId)
  const { price_per_kg } = await getWasteTypeById(wasteTypeId)
  const now = serverTimestamp()
  const subtotalPrice = weightKg * price_per_kg;
  const data = {
    transaction_id: transactionId,
    waste_type_id: wasteTypeId,
    weight_kg: weightKg,
    subtotal_price: subtotalPrice,
    created_at: now,
    updated_at: now
  }
  const docRef = await addDoc(colRef, data)
  return { id: docRef.id }
}

export const get = async (transactionItemId) => {
  const docRef = doc(colRef, transactionItemId)
  const docSnap = await getDoc(docRef)

  if (!docSnap.exists()) {
    throw new Error(`Transaction item with ID ${transactionItemId} not found`)
  }

  return { id: docSnap.id, ...docSnap.data() }
}

export const update = async (transactionItemId, transactionItemData) => {
  await get(transactionItemId)
  const now = serverTimestamp()
  const data = {
    ...transactionItemData,
    updated_at: now
  }
  const docRef = doc(colRef, transactionItemId)
  await updateDoc(docRef, data)
  return { id: transactionItemId, ...data }
}

export const deleteTransactionItem = async (transactionItemId) => {
  await get(transactionItemId)
  const docRef = doc(colRef, transactionItemId)
  await deleteDoc(docRef)
  return { id: transactionItemId, deleted: true }
}