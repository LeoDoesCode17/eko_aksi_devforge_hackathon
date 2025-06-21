import { collection, doc, addDoc, getDoc, deleteDoc, serverTimestamp, updateDoc, getDocs } from 'firebase/firestore'
import { db } from "../firebaseClient";
import { get as getUserById } from './users-collection';
import { get as getWasteRequestById, getWasteRequestsByStatus } from './waste_requests-collection';
/*
Transaction
- id (PK)
- admin_id (FK -> USERS.id) // this is the admin that users interact with
- request_id (FK -> WASTE_REQUESTS.id unique)
- total_point
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
  return { id: transactionId, deleted: true }
}

/**
 * Gets all transaction documents associated with a given user.
 *
 * @param {string} userId - ID of the user.
 * @returns {Promise<Array<Object>>} - Array of transaction objects.
 */
export const getAllTransactionByUser = async (userId) => {
  await getUserById(userId);
  const allStatuses = ['pending', 'used', 'canceled']; // Or just use a more generic query

  // get wasteRequest by user id and status
  let allRequests = [];
  for (const status of allStatuses) {
    const requests = await getWasteRequestsByStatus(userId, status);
    allRequests = allRequests.concat(requests);
  }
  const requestIds = allRequests.map(req => req.id);
  if (requestIds.length === 0) return [];

  // chunked the requestIds by 10 
  const chunked = [];
  for (let i = 0; i < requestIds.length; i += 10) {
    chunked.push(requestIds.slice(i, i + 10)); // Firestore doesn't support `in` with more than 10 items
  }

  // get all transactions using chunked of requestIds
  let transactions = [];
  for (const chunk of chunked) {
    const q = query(colRef, where("request_id", "in", chunk));
    const snapshot = await getDocs(q);
    const result = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    transactions = transactions.concat(result);
  } 
  return transactions;
};

