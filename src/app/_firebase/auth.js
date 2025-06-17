import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from './firebaseClient'

export const login = async (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
}

export const logout = async () => {
  return signOut(auth)
}