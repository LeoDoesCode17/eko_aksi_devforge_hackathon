import { collection, serverTimestamp, updateDoc } from "firebase/firestore"
import { db } from "../firebaseClient"

const COLLECTION_NAME = 'users'
/*
User {
  id (string uuid),
  name (string),
  email (string unique),
  password(string), nik (unique),
  profile_photos_path,
  role (enum: 'user', 'admin', 'superadmin'), 
  is_verified (boolean), 
  timestamp
}
*/

/**
 * Creates a new user document in Firestore with timestamps.
 *
 * @async
 * @function create
 * @param {Object} userData - An object containing user data fields to be saved.
 * @returns {Promise<string>} The newly created document ID.
 *
 * @example
 * const id = await create({ name: "John", email: "john@example.com" });
 */
export const create = async (userData) => {
  const now = serverTimestamp()
  const colRef = collection(db, COLLECTION_NAME)
  const docRef = await addDoc(colRef, {
    ...userData,
    created_at: now,
    updated_at: now
  })
  return docRef.id
}

/**
 * Retrieves a single user document by ID from Firestore.
 *
 * @async
 * @function get
 * @param {string} userId - The ID of the user document to retrieve.
 * @returns {Promise<Object>} The user data including its document ID.
 * @throws {Error} If the document does not exist.
 *
 * @example
 * const user = await get("user123");
 * console.log(user.name);
 */
export const get = async (userId) => {
  const colRef = collection(db, COLLECTION_NAME)
  const docRef = doc(colRef, userId)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() }
  } else {
    throw new Error('User not found')
  }
}

/**
 * Updates a user's data in the Firestore users collection.
 *
 * @async
 * @param {string} userId - The unique identifier of the user to update.
 * @param {Object} userData - The data to update for the user.
 * @returns {Promise<Object>} The updated user data, including the user ID and updated timestamp.
 * @throws {Error} If the user with the specified ID does not exist or the update fails.
 */
export const update = async (userId, userData) => {
  try {
    await get(userId)
  } catch (error) {
    throw new Error(`User with ID ${userId} does not exist.`)
  }
  const colRef = collection(db, COLLECTION_NAME)
  const docRef = doc(colRef, userId)
  const now = serverTimestamp()
  await updateDoc(docRef, {
    ...userData,
    updated_at: now
  })
  return { id: userId, ...userData, updated_at: now }
}

/**
 * Deletes a user document by ID from Firestore.
 *
 * @async
 * @function deleteUser
 * @param {string} userId - The ID of the user document to delete.
 * @returns {Promise<Object>} An object containing the ID and a success message.
 * @throws {Error} If the document does not exist or deletion fails.
 *
 * @example
 * const result = await deleteUser("user123");
 * console.log(result.message);
 */
export const deleteUser = async (userId) => {
  try {
    await get(userId)
  } catch (error) {
    throw new Error(`User with ID ${userId} does not exist.`)
  }
  const colRef = collection(db, COLLECTION_NAME)
  const docRef = doc(colRef, userId)
  await deleteDoc(docRef)
  return { id: userId, deleted: true }
}