'use client'
import { useAuth } from "../context/AuthContext";
import Link from "next/link";

export default function Navbar() {
  const { role } = useAuth()

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <Link href="/">Home</Link>
      <div className="space-x-4">
        {role === "guest" && (
          <>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </>
        )}
        {role === "user" && (
          <>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/profile">Profile</Link>
          </>
        )}
        {role === "admin" && (
          <>
            <Link href="/admin">Admin Panel</Link>
            <Link href="/users">Manage Users</Link>
          </>
        )}
        {role === "superadmin" && (
          <>
            <Link href="/superadmin">Super Admin</Link>
            <Link href="/settings">Settings</Link>
          </>
        )}
      </div>
    </nav>
  )

}