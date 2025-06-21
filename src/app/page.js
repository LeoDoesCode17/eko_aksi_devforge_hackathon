import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen bg-[#FDFBEF]">
      {/* Kiri: Konten */}
      <section className="w-1/2 flex flex-col justify-center px-20 py-16">
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
        <Link
          href="#"
          className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-lg font-semibold transition mb-10 inline-flex items-center self-start"
        >
          Mulai Sekarang &rarr;
        </Link>
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
      </section>
      {/* Kanan: Gambar */}
      <section className="w-1/2 relative">
        <Image
          src="/images/landing_picture.png"
          alt="Aksi bersih pantai"
          fill
          className="object-cover"
          priority
        />
      </section>
    </main>
  );
}