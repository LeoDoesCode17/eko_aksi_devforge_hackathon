"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrMsg("");
    if (!nama) {
      setErrMsg("Nama wajib diisi.");
      return;
    }
    if (password.length < 8) {
      setErrMsg("Kata sandi minimal 8 karakter.");
      return;
    }
    if (!role) {
      setErrMsg("Role wajib dipilih.");
      return;
    }
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nama, email, password, role }),
      });
      if (!res.ok) {
        const data = await res.json();
        setErrMsg(data.message || "Registrasi gagal.");
        return;
      }
      router.push("/auth/login");
    } catch (err) {
      setErrMsg("Terjadi kesalahan server.");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center w-full">
        <Image
          src="/Logo.svg"
          alt="Logo Eko Aksi"
          width={150}
          height={150}
          className="mb-6"
          priority
        />
        <form
          onSubmit={handleSubmit}
          className="rounded-xl shadow-lg px-8 py-10 w-full max-w-sm flex flex-col items-center"
          style={{ backgroundColor: "#005A23" }}
        >
          {/* Judul */}
          <h2 className="text-2xl font-bold text-white mb-1">Selamat Datang</h2>
          <p className="text-white text-sm mb-6 text-center">
            Silahkan daftar untuk masuk ke dalam sistem
          </p>
          {/* Nama */}
          <div className="w-full mb-3">
            <label className="text-white text-sm mb-1 block">Nama</label>
            <input
              type="text"
              placeholder="Masukkan nama"
              className="w-full px-3 py-2 rounded bg-white text-gray-800 border-none outline-none"
              value={nama}
              onChange={e => setNama(e.target.value)}
              required
            />
          </div>
          {/* Email */}
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
          {/* Password */}
          <div className="w-full mb-3">
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
          {/* Role */}
          <div className="w-full mb-4">
            <label className="text-white text-sm mb-1 block">Role</label>
            <select
              className="w-full px-3 py-2 rounded bg-white text-gray-800 border-none outline-none"
              value={role}
              onChange={e => setRole(e.target.value)}
              required
            >
              <option value="">Pilih Role</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          {/* Error */}
          {errMsg && (
            <div className="w-full mb-2 text-center text-sm text-yellow-200 bg-yellow-700 rounded p-2">
              {errMsg}
            </div>
          )}
          {/* Button */}
          <button
            type="submit"
            className="w-full bg-yellow-100 text-green-900 font-bold py-2 rounded mb-2 hover:bg-yellow-200 transition"
          >
            Daftar
          </button>
          {/* Login Link */}
          <div className="mt-2 text-center text-sm text-white">
            Sudah Punya Akun?{" "}
            <Link href="/auth/login" className="font-bold underline">
              Login
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}