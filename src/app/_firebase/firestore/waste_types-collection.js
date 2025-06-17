import { serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../firebaseClient";
/*
WasteType : 
- id (PK)
- name
- category
- price_per_kg
- created_at
- updated_at
*/

const COLLECTION_NAME = 'waste_types'
export const create = async (wasteTypeData) => {
  const now = serverTimestamp()
  const colRef = collection(db, COLLECTION_NAME)
  const docRef = await addDoc(colRef, {
    ...wasteTypeData,
    created_at: now,
    updated_at: now
  })
  return docRef.id
}

export const get = async (wasteTypeId) => {
  const colRef = collection(db, COLLECTION_NAME)
  const docRef = doc(colRef, wasteTypeId)
  const docSnap = await getDoc(docRef)
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() }
  } else {
    throw new Error("Waste Type not found")
  }
}

export const update = async (wasteTypeId, wasteTypeData) => {
  try {
    await get(wasteTypeId)
  } catch (error) {
    throw new Error(`Waste Type with ID ${wasteTypeId} does not exist.`)
  }
  const colRef = collection(db, COLLECTION_NAME)
  const docRef = doc(colRef, wasteTypeId)
  const now = serverTimestamp()
  await updateDoc(docRef, {
    ...wasteTypeData,
    updated_at: now
  })
  return { id: wasteTypeId, ...wasteTypeData, updated_at: now }
}

export const deleteWasteType = async (wasteTypeId) => {
  try {
    await get(wasteTypeId)
  } catch (error) {
    throw new Error(`Waste Type with ID ${wasteTypeId} does not exist.`)
  }
  const colRef = collection(db, COLLECTION_NAME)
  const docRef = doc(colRef, wasteTypeId)
  await deleteDoc(docRef)
  return { id: wasteTypeId, deleted: true }
}