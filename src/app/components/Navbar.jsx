'use client'
import { useAuth } from "../context/AuthContext";
import Link from "next/link";
import { useState } from "react";
import Image from 'next/image';

export default function Navbar() {
  const { role, user } = useAuth()
  const [open, setOpen] = useState(false);

  // Common navigation items
  const navItems = [
    { label: "Beranda", href: "/" },
    { label: "Modul 3R", href: "/3r" },
    { label: "Bank Sampah", href: "/bank-sampah" },
    { label: "FAQ", href: "/faq" },
    { label: "Kontak", href: "/contact" },
  ];

  if (role !== "guest") {
    navItems.push({ label: "Riwayat Transaksi", href: `/${role}/riwayat-transaksi` })
  }

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white text-black px-20 py-3 flex justify-between items-center shadow-md">
      {/* Left: Logo */}
      <div className="text-lg font-semibold">
        {/* <Link href="/">EkoAksi</Link> */}
        <Image
          src="/logos/eko-aksi-logo.svg"
          alt="Logo eko aksi"
          width={100}
          height={100}
        />
      </div>

      {/* Center: Nav Items */}
      <div className="hidden md:flex space-x-6 text-sm">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className="hover:opacity-60">
            {item.label}
          </Link>
        ))}
      </div>

      {/* Right: Guest or Authenticated */}
      <div className="relative">
        {role === "guest" ? (
          <div className="space-x-4">
            <Link
              href="/auth/login"
              className="bg-[#D6ED9F] text-sm font-semibold text-black px-4 py-2 rounded hover:bg-[#33562F] transition"
            >
              Masuk
            </Link>
            <Link
              href="/auth/register"
              className="bg-[#3A6238] text-sm font-semibold text-white px-4 py-2 rounded hover:bg-[#33562F] transition"
            >
              Daftar
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