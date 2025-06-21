'use client'
import { useAuth } from "../context/AuthContext";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const { role } = useAuth()
  const [open, setOpen] = useState(false);

  // Common navigation items
  const navItems = [
    { label: "Beranda", href: "/" },
    { label: "Modul 3R", href: "/3r" },
    { label: "Bank Sampah", href: "/bank-sampah" },
    { label: "FAQ", href: "/faq" },
    { label: "Kontak", href: "/contact" },
  ];
  return (
    <nav className="bg-white text-black px-20 py-3 flex justify-between items-center shadow-md">
      {/* Left: Logo */}
      <div className="text-lg font-bold">
        <Link href="/">MyApp</Link>
      </div>

      {/* Center: Nav Items */}
      <div className="hidden md:flex space-x-6">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className="hover:text-gray-300">
            {item.label}
          </Link>
        ))}
      </div>

      {/* Right: Guest or Authenticated */}
      <div className="relative">
        {role === "guest" ? (
          <div className="space-x-4">
            <Link href="/register" className="hover:text-gray-300">
              Register
            </Link>
            <Link href="/login" className="hover:text-gray-300">
              Login
            </Link>
          </div>
        ) : (
          <div>
            <button
              onClick={() => setOpen(!open)}
              className="hover:text-gray-300 focus:outline-none"
            >
              {user?.email || "Profile"} ⌄
            </button>
            {open && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-md z-50">
                <Link
                  href="/profile"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  My Profile
                </Link>
                <Link
                  href="/settings"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Settings
                </Link>
                {/* Optional: logout link or function */}
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  )

}