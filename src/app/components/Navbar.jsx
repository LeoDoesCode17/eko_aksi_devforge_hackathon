'use client'
import Link from "next/link";
import { useState } from "react";
import Image from 'next/image';
import LoginModal from '../auth/login/LoginModal';
import RegisterModal from '../auth/register/RegisterModal';

export default function Navbar() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  // Common navigation items
  const navItems = [
    { label: "Beranda", href: "/" },
    { label: "Modul 3R", href: "/3r" },
    { label: "Bank Sampah", href: "/bank-sampah" },
    { label: "FAQ", href: "/faq" },
    { label: "Kontak", href: "/contact" },
  ];

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
        <div className="space-x-4">
          <button onClick={() => setShowLogin(true)} className="bg-[#D6ED9F] text-sm font-semibold text-black px-4 py-2 rounded hover:bg-[#33562F] transition">
            Login
          </button>
          <button onClick={() => setShowRegister(true)} className="bg-[#3A6238] text-sm font-semibold text-white px-4 py-2 rounded hover:bg-[#33562F] transition">
            Daftar
          </button>
        </div>
      </div>
      <RegisterModal open={showRegister} onClose={() => setShowRegister(false)} />
      <LoginModal open={showLogin} onClose={() => setShowLogin(false)} />
    </nav>
  )

}