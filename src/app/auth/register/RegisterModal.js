"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function RegisterModal({ open, onClose }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrMsg("");
    setSuccessMsg("");
    if (password.length < 8) {
      setErrMsg("Kata sandi minimal 8 karakter.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      if (!res.ok) {
        const data = await res.json();
        setErrMsg(data.message || "Registrasi gagal.");
        setLoading(false);
        return;
      }
      setSuccessMsg("Registrasi berhasil! Silakan login.");
      setLoading(false);
      // Optional: reset form
      setName("");
      setEmail("");
      setPassword("");
    } catch (err) {
      setErrMsg("Terjadi kesalahan server.");
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white text-xl font-bold"
          aria-label="Tutup"
        >
          ×
        </button>
        <div className="flex flex-col items-center w-full">
          <Image
            src="/Logo.svg"
            alt="Logo Eko Aksi"
            width={100}
            height={100}
            className="mb-4"
            priority
          />
          <form
            onSubmit={handleSubmit}
            className="rounded-xl shadow-lg px-8 py-10 w-full max-w-sm flex flex-col items-center"
            style={{ backgroundColor: "#005A23" }}
          >
            <h2 className="text-2xl font-bold text-white mb-1">Daftar Akun</h2>
            <p className="text-white text-sm mb-6 text-center">
              Isi data di bawah untuk membuat akun baru
            </p>
            <div className="w-full mb-3">
              <label className="text-white text-sm mb-1 block">Nama Lengkap</label>
              <input
                type="text"
                placeholder="Nama Lengkap"
                className="w-full px-3 py-2 rounded bg-white text-gray-800 border-none outline-none"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </div>
            <div className="w-full mb-3">
              <label className="text-white text-sm mb-1 block">Email</label>
              <input
                type="email"
                placeholder="user@gmail.com"
                className="w-full px-3 py-2 rounded bg-white text-gray-800 border-none outline-none"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="w-full mb-1">
              <label className="text-white text-sm mb-1 block">Kata Sandi</label>
              <input
                type="password"
                placeholder="Min. 8 karakter"
                className="w-full px-3 py-2 rounded bg-white text-gray-800 border-none outline-none"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                minLength={8}
              />
            </div>
            {errMsg && (
              <div className="w-full mb-2 text-center text-sm text-yellow-200 bg-yellow-700 rounded p-2">
                {errMsg}
              </div>
            )}
            {successMsg && (
              <div className="w-full mb-2 text-center text-sm text-green-200 bg-green-700 rounded p-2">
                {successMsg}
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-yellow-100 text-green-900 font-bold py-2 rounded mb-2 hover:bg-yellow-200 transition"
              disabled={loading}
            >
              {loading ? "Memproses..." : "Daftar"}
            </button>
            <div className="mt-2 text-center text-sm text-white">
              Sudah punya akun?{" "}
              <button
                type="button"
                className="font-bold underline"
                onClick={() => {
                  onClose();
                  // Optional: trigger login modal jika ingin
                }}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}