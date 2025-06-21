import { addDoc, getDoc, getDocs, serverTimestamp, updateDoc } from "firebase/firestore"
import { db } from "../firebaseClient"
import { get as getUserById } from "./users-collection"
/*
MarketPlaceItem
- id (PK uuid)
- seller_id (FK users)
- product_name (string)
- description (string)
- point_price (double)
- is_free_threshold (double)
- stock (int)
- image_url(string)
- subtotal_point (double)
- created_at
- updated_at
*/
const COLLECTION_NAME = 'marketplace_items'
const colRef = collection(db, COLLECTION_NAME)

/**
 * Fetches all marketplace items from Firestore.
 *
 * @returns {Promise<Array<Object>>} A list of all marketplace items.
 */
export const getAll = async () => {
  const querySnapshot = await getDocs(colRef)
  const results = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))
  return results
}

/**
 * Fetches a single marketplace item by its ID.
 *
 * @param {string} marketplaceItemId - The ID of the marketplace item.
 * @returns {Promise<Object>} The item data including its ID.
 * @throws {Error} If the item does not exist.
 */
export const get = async (marketplaceItemId) => {
  const docRef = doc(colRef, marketplaceItemId)
  const docSnap = await getDoc(docRef)
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() }
  } else {
    throw new Error("Marketplace item not found")
  }
}

/**
 * Reduces the stock of a marketplace item by a specified quantity.
 *
 * @param {string} marketplaceItemId - The ID of the item to update.
 * @param {number} quantity - The quantity to deduct from stock.
 * @returns {Promise<{ id: string, stock: number }>} The updated item ID and new stock value.
 * @throws {Error} If stock is insufficient.
 */
export const takeStock = async (marketplaceItemId, quantity) => {
  const marketplaceItem = await get(marketplaceItemId)
  if (marketplaceItem.stock < quantity) {
    throw new Error("Market place item stock is insufficient")
  }
  const docRef = doc(colRef, marketplaceItemId)
  const now = serverTimestamp()
  const updatedStock = marketplaceItem.stock - quantity
  await updateDoc(docRef, {
    stock: updatedStock,
    updated_at: now
  })
  return { id: marketplaceItemId, stock: updatedStock }
}

/**
 * Fetches all marketplace items posted by a specific seller.
 *
 * @param {string} sellerId - The ID of the seller (user).
 * @returns {Promise<Array<Object>>} List of marketplace items created by the seller.
 * @throws {Error} If the seller is not found.
 */
export const getMarketplaceItemsBySellerId = async (sellerId) => {
  await getUserById(sellerId)
  const q = query(colRef, where("seller_id", "==", sellerId));
  const querySnapshot = await getDocs(q);
  const items = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
  return items;
}

/**
 * Creates a new marketplace item in Firestore.
 *
 * @param {string} sellerId - The ID of the seller (user).
 * @param {Object} marketplaceData - Data for the new item.
 * @param {string} marketplaceData.seller_id - The ID of the seller (should match `sellerId`).
 * @param {string} marketplaceData.product_name - Name of the product.
 * @param {string} marketplaceData.description - Description of the product.
 * @param {number} marketplaceData.point_price - Price in points.
 * @param {number|null} marketplaceData.is_free_threshold - Point threshold to get item free.
 * @param {number} marketplaceData.stock - Initial stock of the item.
 * @param {string} marketplaceData.image_url - URL of the product image.
 * @returns {Promise<{ id: string }>} The ID of the newly created item.
 * @throws {Error} If the seller does not exist.
 */
export const create = async (sellerId, marketplaceData) => {
  await getUserById(sellerId)
  const {
    seller_id,
    product_name,
    description,
    point_price,
    is_free_threshold,
    stock,
    image_url
  } = marketplaceData;
  const now = serverTimestamp()
  const newItem = {
    seller_id,
    product_name,
    description,
    point_price,
    is_free_threshold: is_free_threshold ?? null,
    stock,
    image_url,
    created_at: now,
    updated_at: now
  }
  const docRef = await addDoc(colRef, newItem)
  return { id: docRef.id }
}


