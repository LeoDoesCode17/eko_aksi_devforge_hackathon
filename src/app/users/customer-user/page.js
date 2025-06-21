"use client";
import { useState } from "react";

const dummyRequests = [
  {
    bank: "Bank Sampah Berkah",
    code: "7b918681-7a93-4b7d-95f6-2557357ac36d",
    status: "Used",
    date: "12/03/2025",
  },
  {
    bank: "Bank Sampah Berkah",
    code: "7b918681-7a93-4b7d-95f6-2557357ac36d",
    status: "Pending",
    date: "12/03/2025",
  },
  {
    bank: "Bank Sampah Berkah",
    code: "7b918681-7a93-4b7d-95f6-2557357ac36d",
    status: "Used",
    date: "12/03/2025",
  },
  {
    bank: "Bank Sampah Berkah",
    code: "7b918681-7a93-4b7d-95f6-2557357ac36d",
    status: "Canceled",
    date: "12/03/2025",
  },
  // ...tambahkan data sesuai kebutuhan
];

const banks = [
  "Bank Sampah Berkah",
  "Bank Sampah Makmur",
  "Bank Sampah Hijau",
];

export default function CustomerUserPage() {
  const [showModal, setShowModal] = useState(false);
  const [selectedBank, setSelectedBank] = useState(banks[0]);
  const [notif, setNotif] = useState(null);

  const handleRequest = () => {
    // Simulasi kode request baru
    const newCode = crypto.randomUUID();
    setNotif(newCode);
    setShowModal(false);
    // Tambahkan logic request ke backend di sini
  };

  return (
    <div className="min-h-screen flex bg-gray-200">
      {/* Sidebar */}
      <aside className="w-64 bg-white text-black flex flex-col justify-between py-6 px-6 min-h-screen">
        <div>
          <div className="flex items-center mb-10">
            <img src="/logos/eko-aksi-logo.svg" alt="EkoAksi" className="w-8 h-8 mr-2" />
            <span className="font-bold text-lg">EkoAksi</span>
          </div>
          <nav className="flex flex-col gap-6">
            <div>
              <div className="text-xs font-bold mb-2">AKTIVITAS</div>
              <a href="#" className="block py-1 pl-2 rounded hover:bg-green-900">Beranda</a>
            </div>
            <div>
              <div className="text-xs font-bold mb-2">BANK SAMPAH</div>
              <a href="#" className="block py-1 pl-2 rounded bg-white text-[#166534] font-semibold">Request</a>
            </div>
            <div>
              <div className="text-xs font-bold mb-2">MARKETPLACE</div>
              <a href="#" className="block py-1 pl-2 rounded hover:bg-green-900">Produk</a>
              <a href="#" className="block py-1 pl-2 rounded hover:bg-green-900">Transaksi</a>
              <a href="#" className="block py-1 pl-2 rounded hover:bg-green-900">Riwayat</a>
            </div>
          </nav>
        </div>
        {/* User info */}
        <div className="flex items-center gap-3 mt-10">
          <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white font-bold">AA</div>
          <div>
            <div className="font-semibold text-sm">Ahmad Akbar</div>
            <div className="text-xs text-gray-300">Kasir</div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-[#FDFBEF] p-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Request</h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-white border border-gray-400 px-4 py-2 rounded font-semibold hover:bg-gray-100 flex items-center gap-2"
          >
            Buat Request <span className="text-lg font-bold">+</span>
          </button>
        </div>

        {/* Notifikasi kode request */}
        {notif && (
          <div className="bg-orange-500 text-white rounded p-4 mb-6">
            <div className="font-semibold">Request Baru Telah Dibuat</div>
            <div className="text-lg font-bold">
              Kode Request : {notif}
            </div>
          </div>
        )}

        {/* Tabel Request */}
        <div className="bg-white rounded shadow overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-green-800 text-white">
                <th className="py-3 px-4 text-left">NAMA BANK SAMPAH</th>
                <th className="py-3 px-4 text-left">REQUEST CODE</th>
                <th className="py-3 px-4 text-left">STATUS</th>
                <th className="py-3 px-4 text-left">TANGGAL</th>
              </tr>
            </thead>
            <tbody>
              {dummyRequests.map((req, idx) => (
                <tr key={idx} className="border-b last:border-b-0">
                  <td className="py-2 px-4">{req.bank}</td>
                  <td className="py-2 px-4">{req.code}</td>
                  <td className="py-2 px-4">{req.status}</td>
                  <td className="py-2 px-4">{req.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* Modal Buat Request */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg shadow-lg p-8 w-80">
            <h2 className="text-lg font-bold mb-4">Modal Buat Request</h2>
            <div className="mb-4">
              <label className="block mb-2 font-semibold">Pilih Bank Sampah</label>
              <select
                className="w-full border rounded px-3 py-2"
                value={selectedBank}
                onChange={e => setSelectedBank(e.target.value)}
              >
                {banks.map((bank, idx) => (
                  <option key={idx} value={bank}>{bank}</option>
                ))}
              </select>
            </div>
            <button
              className="w-full bg-green-800 text-white py-2 rounded font-semibold hover:bg-green-900 transition"
              onClick={handleRequest}
            >
              Konfirmasi
            </button>
            <button
              className="w-full mt-2 text-gray-600 py-2 rounded hover:bg-gray-100 transition"
              onClick={() => setShowModal(false)}
            >
              Batal
            </button>
          </div>
        </div>
      )}
    </div>
  );
}