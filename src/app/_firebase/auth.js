import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from './firebaseClient'

/**
 * Registers a new user with the provided email and password using Firebase Authentication.
 *
 * @async
 * @function register
 * @param {string} email - The new user's email address.
 * @param {string} password - The new user's password.
 * @returns {Promise<UserCredential>} A promise that resolves with the user credentials upon successful registration.
 */
export const register = async (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password)
}

/**
 * Signs in a user with the provided email and password using Firebase Authentication.
 *
 * @async
 * @function login
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @returns {Promise<UserCredential>} A promise that resolves with the user credentials upon successful sign-in.
 */
export const login = async (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
}

/**
 * Signs out the currently authenticated user from Firebase Authentication.
 *
 * @async
 * @function logout
 * @returns {Promise<void>} A promise that resolves when the user is signed out.
 */
export const logout = async () => {
  return signOut(auth)
}
