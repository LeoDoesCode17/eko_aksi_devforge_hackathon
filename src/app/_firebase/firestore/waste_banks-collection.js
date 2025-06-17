import { deleteDoc, serverTimestamp, updateDoc } from "firebase/firestore"
import { db } from "../firebaseClient"

/*
Waste_Banks {
- id (PK uuid string)
- name (string)
- address (string)
- city (string)
- latitude (float)
- longitude (float)
- created_at (timestamp)
- updated_at (timestamp)
}
*/
const COLLECTION_NAME = 'waste_banks'
export const create = async (wasteBankData) => {
  const now = serverTimestamp()
  const colRef = collection(db, COLLECTION_NAME)
  const docRef = await addDoc(colRef, {
    ...wasteBankData,
    created_at: now,
    updated_at: now
  })
  return docRef.id
}

export const get = async (wasteBankId) => {
  const colRef = collection(db, COLLECTION_NAME)
  const docRef = doc(colRef, wasteBankId)
  const docSnap = await getDoc(docRef)
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() }
  } else {
    throw new Error("Waste Bank not found")
  }
}

export const update = async (wasteBankId, wasteBankData) => {
  try {
    await get(wasteBankId)
  } catch (error) {
    throw new Error(`Waste Bank with ID ${wasteBankId} does not exist.`)
  }
  const colRef = collection(db, COLLECTION_NAME)
  const docRef = doc(colRef, wasteBankId)
  const now = serverTimestamp()
  await updateDoc(docRef, {
    ...wasteBankData,
    updated_at: now
  })
  return { id: wasteBankId, ...wasteBankData, updated_at: now }
}

export const deleteWasteBank = async (wasteBankId) => {
  try {
    await get(wasteBankId)
  } catch (error) {
    throw new Error(`Waste Bank with ID ${wasteBankId} does not exist.`)
  }
  const colRef = collection(db, COLLECTION_NAME)
  const docRef = doc(colRef, wasteBankId)
  await deleteDoc(docRef)
  return { id: wasteBankId, deleted: true }
}
