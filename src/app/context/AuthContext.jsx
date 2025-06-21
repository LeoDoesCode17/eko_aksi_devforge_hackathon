'use client'
import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../_firebase/firebaseClient";
import { get as getUserById } from "../_firebase/firestore/users-collection";

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [role, setRole] = useState("guest")

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser)
        try {
          const userData = await getUserById(firebaseUser.uid)
          setRole(userData?.role || "guest")
        } catch (error) {
          console.error(`Error when get user ID-${firebaseUser.uid} with error: ${error}`)
        }
      }
    })
    return () => unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ user, role }}>
      { children }
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);