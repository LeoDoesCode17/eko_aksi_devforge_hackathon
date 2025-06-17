import { collection, doc, addDoc, getDoc, deleteDoc, serverTimestamp, updateDoc } from 'firebase/firestore'
import { db } from "../firebaseClient";
import { get as getUserById } from './users-collection';
import { get as  getWasteRequestById} from './waste_requests-collection';
/*
Transaction
- id (PK)
- admin_id (FK -> USERS.id) // this is the admin that users interact with
- request_id (FK -> WASTE_REQUESTS.id unique)
- total_price
- transaction_time
- status (enum: ‘done’, ‘pending’, ‘canceled’)
- created_at
- updated_at
*/

const COLLECTION_NAME = 'transactions'
const colRef = collection(db, COLLECTION_NAME)

export const create = async (adminId, wasteRequestId, transactionData) => {
  await getUserById(adminId)
  await getWasteRequestById(wasteRequestId)
  const now = serverTimestamp()
  const data = {
    ...transactionData,
    admin_id: adminId,
    request_id: wasteRequestId,
    created_at: now,
    updated_at: now
  }
  const docRef = await addDoc(colRef, data)
  return { id: docRef.id }
}

export const get = async (transactionId) => {
  const docRef = doc(colRef, transactionId)
  const docSnap = await getDoc(docRef)

  if (!docSnap.exists()) {
    throw new Error(`Transaction with ID ${transactionId} not found`)
  }

  return { id: docSnap.id, ...docSnap.data() }
}

export const update = async (transactionId, transactionData) => {
  await get(transactionId) // Ensure the transaction exists
  const now = serverTimestamp()
  const data = {
    ...transactionData,
    updated_at: now
  }
  const docRef = doc(colRef, transactionId)
  await updateDoc(docRef, data)
  return { id: transactionId, ...data }
}

export const deleteTransaction = async (transactionId) => {
  await get(transactionId) // Ensure the transaction exists
  const docRef = doc(colRef, transactionId)
  await deleteDoc(docRef)
  return { id: transactionId , deleted : true}
}