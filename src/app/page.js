"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState } from "react";
import LoginModal from './auth/login/LoginModal';

function FAQAccordion() {
  const [open, setOpen] = useState(0);
  const faqs = [
    {
      q: "Apa itu EkoAksi?",
      a: "EkoAksi adalah platform web interaktif yang membantu kamu memahami dan menerapkan prinsip 3R (Reduce, Reuse, Recycle) dalam kehidupan sehari-hari. Kami juga menyediakan informasi lokasi bank sampah dan panduan aksi lingkungan yang bisa kamu lakukan.",
    },
    {
      q: "Apakah EkoAksi hanya untuk warga Makassar?",
      a: "",
    },
    {
      q: "Siapa saja yang bisa menggunakan EkoAksi?",
      a: "",
    },
    {
      q: "Bagaimana cara menggunakan fitur peta bank sampah?",
      a: "",
    },
    {
      q: "Apakah saya bisa berkontribusi di EkoAksi?",
      a: "",
    },
  ];

  return (
    <div className="flex flex-col gap-3 w-full max-w-xl">
      {faqs.map((item, idx) => (
        <div key={idx} className="rounded-lg overflow-hidden">
          <button
            className={`w-full text-left px-6 py-4 font-semibold flex justify-between items-center transition text-white ${open === idx ? "rounded-b-none" : ""}`} style={{ backgroundColor: "#005A23" }}
            onClick={() => setOpen(open === idx ? -1 : idx)}
          >
            <span>{item.q}</span>
            <span className="text-2xl">{open === idx ? "−" : "+"}</span>
          </button>
          {open === idx && (
            <div className="bg-white text-green-900 px-6 py-4 border-t" style={{ backgroundColor: "#005A23" }}>
              {item.a || <span className="italic text-gray-500">Belum ada jawaban.</span>}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// Accordion 3R component
function Modul3RAccordion() {
  const [openAccordion, setOpenAccordion] = useState("reduce");
  const handleAccordion = (panel) => {
    setOpenAccordion(openAccordion === panel ? null : panel);
  };

    const AccordionContent = ({ show, children }) => (
    <div
      style={{
        maxHeight: show ? 500 : 0,
        overflow: "hidden",
        transition: "max-height 0.5s cubic-bezier(0.4,0,0.2,1)",
      }}
    >
      <div className="py-2">{children}</div>
    </div>
  );

  return (
    <div className="w-1/2 flex flex-col justify-center">
      <span className="bg-orange-200 text-orange-700 px-3 py-1 rounded-full text-sm font-semibold mb-4 inline-block">
        🟧 MODUL 3R
      </span>
      <h2 className="text-3xl font-bold mb-3">Yuk Belajar Cara Menjaga Lingkungan</h2>
      <p className="text-gray-700 mb-8">
        Pahami prinsip 3R lebih dalam dan temukan langkah-langkah sederhana yang bisa kamu lakukan setiap hari untuk menjaga lingkungan.
      </p>

      {/* Reduce */}
      <div className="border-b border-gray-300 py-4">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => handleAccordion("reduce")}
        >
          <span className="text-xl font-bold">Reduce</span>
          <span className="text-2xl font-bold text-gray-500 select-none">
            {openAccordion === "reduce" ? "−" : "+"}
          </span>
        </div>
        <AccordionContent show={openAccordion === "reduce"}>
          <div className="mt-2">
            <p className="text-gray-700 mb-3">
              Reduce berarti mengurangi penggunaan barang yang berpotensi menjadi sampah. Semakin sedikit sampah yang kita hasilkan, semakin sedikit juga beban bumi.
            </p>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded text-sm mb-2">
              <div className="font-semibold mb-1">Contoh tindakan Reduce:</div>
              <ul className="list-disc pl-5 space-y-1">
                <li>Membawa botol minum sendiri daripada membeli air kemasan.</li>
                <li>Belanja dengan tas kain, bukan kantong plastik sekali pakai.</li>
                <li>Memilih produk yang tidak memiliki banyak kemasan.</li>
                <li>Menghemat penggunaan listrik dan air.</li>
              </ul>
            </div>
          </div>
        </AccordionContent>
      </div>

      {/* Reuse */}
      <div className="border-b border-gray-300 py-4">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => handleAccordion("reuse")}
        >
          <span className="text-xl font-bold">Reuse</span>
          <span className="text-2xl font-bold text-gray-500 select-none">
            {openAccordion === "reuse" ? "−" : "+"}
          </span>
        </div>
        <AccordionContent show={openAccordion === "reuse"}>
          <div className="mt-2">
            <p className="text-gray-700 mb-3">
              Reuse berarti menggunakan kembali barang-barang yang masih layak pakai untuk mengurangi sampah.
            </p>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded text-sm mb-2">
              <div className="font-semibold mb-1">Contoh tindakan Reuse:</div>
              <ul className="list-disc pl-5 space-y-1">
                <li>Menggunakan kembali kantong belanja.</li>
                <li>Memanfaatkan botol bekas sebagai pot tanaman.</li>
                <li>Mendaur ulang kertas bekas untuk catatan.</li>
              </ul>
            </div>
          </div>
        </AccordionContent>
      </div>

      {/* Recycle */}
      <div className="border-b border-gray-300 py-4">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => handleAccordion("recycle")}
        >
          <span className="text-xl font-bold">Recycle</span>
          <span className="text-2xl font-bold text-gray-500 select-none">
            {openAccordion === "recycle" ? "−" : "+"}
          </span>
        </div>
        <AccordionContent show={openAccordion === "recycle"}>
          <div className="mt-2">
            <p className="text-gray-700 mb-3">
              Recycle berarti mengolah kembali sampah menjadi barang baru yang bermanfaat.
            </p>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded text-sm mb-2">
              <div className="font-semibold mb-1">Contoh tindakan Recycle:</div>
              <ul className="list-disc pl-5 space-y-1">
                <li>Mendaur ulang plastik, kertas, dan logam di bank sampah.</li>
                <li>Mengubah sampah organik menjadi kompos.</li>
              </ul>
            </div>
          </div>
        </AccordionContent>
      </div>
    </div>
  );
}

export default function Home() {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <main className="min-h-screen bg-[#FDFBEF] flex flex-col">
      {/* Landing Section: dua kolom */}
      <section className="flex w-full">
        {/* Kiri: Konten */}
        <div className="w-1/2 flex flex-col justify-center px-20 py-16">
          <div className="mb-4">
            <span className="bg-[#FF9103] bg-opacity-20 text-[#f2eeea] px-3 py-1 rounded-full text-sm font-semibold">
              🌱 GREEN LIFESTYLE
            </span>
          </div>
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            Satukan Langkah<br />
            Menuju Bumi yang<br />
            Lebih Lestari
          </h1>
          <p className="text-gray-700 mb-8">
            EkoAksi hadir sebagai platform interaktif untuk membangun kesadaran dan mengajak kamu terlibat langsung dalam gaya hidup ramah lingkungan
          </p>
          <button onClick={() => setShowLogin(true)} className="hover:bg-green-800 text-white px-4 py-2 rounded-lg font-semibold transition mb-10 inline-flex items-center self-start" style={{ backgroundColor: "#005A23" }}>
            Mulai Sekarang &rarr;
          </button>
          <div className="flex items-center gap-3">
            {/* Foto profil */}
            <div className="flex -space-x-2">
              <Image
                src="/profile1.jpg"
                alt="User 1"
                width={40}
                height={40}
                className="rounded-full border-2 border-white"
              />
              <Image
                src="/profile2.jpg"
                alt="User 2"
                width={40}
                height={40}
                className="rounded-full border-2 border-white"
              />
              <Image
                src="/profile3.jpg"
                alt="User 3"
                width={40}
                height={40}
                className="rounded-full border-2 border-white"
              />
            </div>
            <span className="ml-2 text-lg font-semibold">
              <span className="inline-block align-middle mr-1">👤</span>
              100+
            </span>
            <span className="text-gray-600 text-sm">Orang Telah Bergabung</span>
          </div>
        </div>
        {/* Kanan: Gambar */}
        <div className="w-1/2 relative">
          <Image
            src="/images/landing_picture.png"
            alt="Aksi bersih pantai"
            fill
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* Section Edukasi/Statistik di bawah landing */}
      <section id="edukasi" className="w-full mt-20">
        {/* Statistik */}
        <section className="w-full bg-green-700 text-white py-10 px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-1">10</div>
              <div className="text-lg">Mitra Bank Sampah</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-1">1 JT+</div>
              <div className="text-lg">Sampah Terkumpul</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-1">5</div>
              <div className="text-lg">Lokasi Berbeda</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-1">100+</div>
              <div className="text-lg">Pengguna Terdaftar</div>
            </div>
          </div>
        </section>
        {/* Konten edukasi */}
        <section className="max-w-6xl mx-auto mt-10 bg-white rounded-lg shadow flex p-10 gap-10">
          {/* Kiri: Accordion */}
          <Modul3RAccordion />
          {/* Kanan: Gambar dan info */}
          <div className="w-1/2 flex flex-col items-center">
            <div className="w-full overflow-hidden relative p-4" style={{ backgroundColor: "#005A23" }}>
              <div className="relative w-full h-[340px] overflow-hidden"  style={{ borderTopRightRadius: 40, borderTopLeftRadius: 0, borderBottomRightRadius: 0, borderBottomLeftRadius: 0, background: "#166534" }}>
                <Image
                  src="/images/modul_picture.png"
                  alt="Vertical garden"
                  fill
                  className="object-cover"
                  style={{ borderTopRightRadius: 40, borderTopLeftRadius: 0 }}
                />
              </div>
              <div className="p-6 text-white">
                <div className="font-bold mb-2">✱ Kenapa ini penting?</div>
                <div className="text-sm">
                  Setiap barang yang kita beli, mempunyai jejak karbon. Dengan mengurangi konsumsi, kita juga mengurangi limbah dan polusi yang dihasilkan.
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
      <LoginModal open={showLogin} onClose={() => setShowLogin(false)} />
    </main>
  );
}

// ...existing code...
export function map () {
  return (
    <section className="w-full bg-[#FFF7E2] py-16 flex justify-center">
        <div className="max-w-6xl w-full flex flex-col items-center">
          <div className="w-full flex flex-col md:flex-row md:items-start mb-8">
            <div className="flex-1">
              <span className="bg-orange-200 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4 inline-block">
                🟧 BANK SAMPAH
              </span>
              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                Temukan Lokasi<br />Bank Sampah di Sekitarmu
              </h2>
            </div>
            <div className="flex-1">
              <p className="text-gray-700 mt-4 md:mt-0">
                Kenali lebih dekat tempat-tempat yang bisa membantumu mengelola sampah dengan lebih bijak. Melalui peta di bawah, kamu bisa melihat persebaran bank sampah lengkap dengan nama, alamat, dan kecamatan masing-masing.
              </p>
            </div>
          </div>
          <div className="w-full flex justify-center">
            <div className="border-[8px] border-green-700 w-full max-w-4xl bg-white">
            <iframe
                  src="https://www.google.com/maps/embed?pb=..." // ganti dengan link embed Google Maps Anda
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-[400px]"
                ></iframe>
            </div>
          </div>
        </div>
      </section>
  )
  
}

      