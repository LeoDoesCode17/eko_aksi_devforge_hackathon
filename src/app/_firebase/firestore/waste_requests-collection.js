import {
  collection,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  getDocs
} from "firebase/firestore"
import { db } from "../firebaseClient"
import { get as getUserById } from "./users-collection"
import { get as getWasteBankById } from "./waste_banks-collection"
import { v4 as uuidv4 } from "uuid"

const COLLECTION_NAME = 'waste_requests'
const colRef = collection(db, COLLECTION_NAME)

/*
WasteRequest:
- id (PK string uuid)
- user_id (FK -> USERS.id)
- waste_bank_id (FK -> WASTE_BANKS.id)
- request_code (Unique)
- status (enum: 'pending', 'used', ‘canceled’)
- created_at
- updated_at
*/

/**
 * Creates a new waste request document in Firestore.
 *
 * @param {string} userId - ID of the user making the request.
 * @param {string} wasteBankId - ID of the waste bank the request is sent to.
 * @returns {Promise<{ id: string }>} - ID of the created request.
 */
export const create = async (userId, wasteBankId) => {
  try {
    await getUserById(userId)
    await getWasteBankById(wasteBankId)
  } catch (error) {
    throw new Error(`User with ID-${userId} or Waste Bank with ID-${wasteBankId} not found: ${error.message}`)
  }

  const now = serverTimestamp()
  const requestData = {
    user_id: userId,
    waste_bank_id: wasteBankId,
    request_code: uuidv4(),
    status: 'pending',
    created_at: now,
    updated_at: now
  }

  const docRef = await addDoc(colRef, requestData)
  return { id: docRef.id }
}

/**
 * Retrieves a waste request document by ID.
 *
 * @param {string} requestId - ID of the request.
 * @returns {Promise<Object>} - Request document data with `id`.
 */
export const get = async (requestId) => {
  const docRef = doc(colRef, requestId)
  const docSnap = await getDoc(docRef)

  if (!docSnap.exists()) {
    throw new Error(`Waste request with ID ${requestId} not found`)
  }

  return { id: docSnap.id, ...docSnap.data() }
}

/**
 * Updates a waste request document by ID.
 *
 * @param {string} requestId - ID of the request to update.
 * @param {Object} requestData - Fields to update.
 * @returns {Promise<Object>} - Updated data including ID and `updated_at`.
 */
export const update = async (requestId, requestData) => {
  await get(requestId) // Ensures document exists

  const docRef = doc(colRef, requestId)
  const updated_at = serverTimestamp()

  await updateDoc(docRef, {
    ...requestData,
    updated_at
  })

  return { id: requestId, ...requestData, updated_at }
}

/**
 * Deletes a waste request document by ID.
 *
 * @param {string} requestId - ID of the request to delete.
 * @returns {Promise<{ id: string, deleted: true }>}
 */
export const deleteWasteRequest = async (requestId) => {
  await get(requestId) // Ensures document exists

  const docRef = doc(colRef, requestId)
  await deleteDoc(docRef)

  return { id: requestId, deleted: true }
}

/**
 * Gets all waste requests for a specific user with certain status.
 *
 * @param {string} userId - ID of the user.
 * @param {string} status - status of the request.
 * @returns {Promise<Array<Object>>} - Array of pending requests.
 */
export const getWasteRequestsByStatus = async (userId, status) => {
  await getUserById(userId);
  const query = query(
    colRef,
    where("user_id", "==", userId),
    where("status", "==", status)
  )
  const querySnapshot = await getDocs(query);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))
}

/**
 * Retrieves a single waste request document from Firestore using its unique request code.
 *
 * @async
 * @function getWasteRequestByRequestCode
 * @param {string} requestCode - The unique request code associated with the waste request.
 * @returns {Promise<Object>} - A Promise that resolves to the waste request document,
 *                               including its Firestore `id` and all associated fields.
 * @throws {Error} - If no waste request is found with the given request code.
 *
 * @example
 * const request = await getWasteRequestByRequestCode("uuidv4");
 * console.log(request.status); // 'pending', 'used', or 'canceled'
 */
export const getWasteRequestByRequestCode = async (requestCode) => {
  const query = query(
    colRef,
    where("request_code", "==", requestCode)
  )
  const querySnapshot = await getDocs(q)
  if (querySnapshot.empty) {
    throw new Error(`No waste request found with code ${requestCode}`)
  }
  const docSnap = querySnapshot.docs[0]
  return { id: docSnap.id, ...docSnap.data() }
}