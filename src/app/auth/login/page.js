"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrMsg("");
    if (password.length < 8) {
      setErrMsg("Kata sandi minimal 8 karakter.");
      return;
    }
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const data = await res.json();
        setErrMsg(data.message || "Login gagal.");
        return;
      }
      // Jika sukses, redirect ke dashboard/home
      router.push("/");
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
            Silahkan login untuk masuk ke dalam sistem
          </p>
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
          <div className="w-full flex justify-end mb-4">
            <Link href="/auth/forgot" className="text-xs text-white underline">
              Lupa Kata Sandi?
            </Link>
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
            Login
          </button>
          {/* Register Link */}
          <div className="mt-2 text-center text-sm text-white">
            Belum Punya Akun?{" "}
            <Link href="/auth/register" className="font-bold underline">
              Daftar
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}