'use client';

import Image from 'next/image';
import CatatanBox from '@/app/components/obatobatan/CatatanBox';

export default function ObatObatanPage() {
  const daftarObat = [
    {
      nama: "Paracetamol 500 mg",
      gambar: "/images/paracetamol.png",
      tipe: "Tablet",
      desc: "Di gunakan untuk meredakan demam dan nyeri ringan seperti sakit kepala.",
      aturan: "1 tablet, 3 kali 1 hari sesudah makan.",
    },
    {
      nama: "CTM 4 mg",
      gambar: "/images/ctm.png",
      tipe: "Tablet",
      desc: "CTM 4 mg adalah obat antihistamin yang berfungsi untuk meredakan gejala alergi, seperti gatal-gatal, biduran, bersin, dll.",
      aturan: "1 tablet, 3-4 kali sehari bila diperlukan.",
    },
    {
      nama: "Diapet",
      gambar: "/images/diap0t.png",
      tipe: "Kapsul",
      desc: "Diapet adalah obat herbal yang digunakan untuk membantu mengatasi diare, mengurangi frekuensi buang air besar, dan membantu memadatkan feses.",
      aturan: "2 kapsul, 2 kali sehari setelah makan.",
    },
    {
      nama: "Promag",
      gambar: "/images/promag.png",
      tipe: "Tablet Kunyah",
      desc: "Promag adalah obat antasida yang digunakan untuk meredakan gejala maag akibat asam lambung berlebih.",
      aturan: "1-2 tablet kunyah, 3-4 kali sehari, sebelum makan.",
    },
    {
      nama: "Bodrex",
      gambar: "/images/bodrex.png",
      tipe: "Tablet",
      desc: "Bodrex adalah obat yang digunakan untuk meredakan sakit kepala, demam, dan nyeri ringan, seperti nyeri otot, nyeri gigi, atau pegal-pegal.",
      aturan: "1 tablet, 3 kali sehari atau sesuai kebutuhan.",
    },
    {
      nama: "Betadine",
      gambar: "/images/betadin.png",
      tipe: "Cairan",
      desc: "Betadine adalah antiseptik yang mengandung povidone-iodine untuk mencegah dan mengatasi infeksi pada luka ringan, seperti luka lecet, luka gores, luka sayat kecil, dan luka bakar ringan.",
      aturan: "Oleskan Betadine secukupnya pada area luka 1-3 kali sehari.",
    },
    {
      nama: "Salep 88",
      gambar: "/images/salep.png",
      tipe: "Salep",
      desc: "Salep 88 adalah obat luar yang digunakan untuk membantu mengatasi penyakit kulit akibat infeksi jamur.",
      aturan: "Oleskan salep tipis-tipis pada bagian yang terkena 2-3 kali sehari.",
    },
    {
      nama: "Hansaplast",
      gambar: "/images/hansaplas.png",
      tipe: "Plester Luka",
      desc: "Digunakan untuk menutup luka kecil agar tetap bersih dan terlindungi.",
      aturan: "Tempelkan pada luka yang sudah dibersihkan.",
    },
  ];

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat px-4 sm:px-8 md:px-12 lg:px-16 pt-6 md:pt-10 pb-12 w-full overflow-x-hidden"
      style={{
        backgroundImage: "url('/images/background.png')",
      }}
    >
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between mb-10 md:mb-12 gap-6">

        {/* Sisi Kiri (Judul & Deskripsi) */}
        <div className="text-center md:text-left flex flex-col items-center md:items-start max-w-md">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0A405A] mb-3">
            Obat - Obatan
          </h1>

          {/* Gambar khusus HP */}
          <div className="w-56 h-32 relative my-2 md:hidden">
            <Image
              src="/images/obet.png"
              alt="Ilustrasi Obat"
              fill
              className="object-contain"
            />
          </div>

          <p className="text-gray-700 text-sm md:text-base leading-relaxed">
            Daftar obat yang tersedia di UKS untuk membantu mengatasi keluhan ringan.
          </p>
        </div>

        {/* Gambar khusus Desktop */}
        <div className="hidden md:block w-72 lg:w-80 h-44 relative shrink-0">
          <Image
            src="/images/obet.png"
            alt="Ilustrasi Obat"
            fill
            className="object-contain"
          />
        </div>

      </div>

      {/* Grid Card Obat (Gap Diperbesar Jadi gap-6 md:gap-8 Supaya Tidak Berdempetan) */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12">
        {daftarObat.map((obat, idx) => (
          <div
            key={idx}
            className="bg-white p-5 rounded-3xl border border-gray-200 shadow-xl flex flex-col relative h-full hover:shadow-2xl transition-shadow duration-200"
          >
            {/* Bagian Atas Card (Gambar + Judul) */}
            <div className="flex gap-3 mb-4 items-start">
              <div className="w-16 h-16 sm:w-20 sm:h-16 relative shrink-0">
                <Image
                  src={obat.gambar}
                  alt={obat.nama}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-sm sm:text-base text-gray-800 leading-tight mb-1">
                  {obat.nama}
                </h3>
                <span className="text-[10px] sm:text-[11px] bg-blue-100 text-blue-700 px-2.5 py-0.5 rounded-md font-medium inline-block">
                  {obat.tipe}
                </span>
              </div>
            </div>

            {/* Deskripsi Obat */}
            <p className="text-xs text-gray-600 mb-4 flex-grow leading-relaxed">
              {obat.desc}
            </p>

            {/* Aturan Pakai */}
            <div className="bg-blue-100/50 p-3 rounded-2xl flex gap-2.5 items-center mt-auto border border-blue-200">
              <div className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] shrink-0 font-bold">
                i
              </div>
              <div>
                <p className="text-[9px] font-bold text-blue-900 uppercase tracking-wide">
                  Aturan pakai:
                </p>
                <p className="text-[10px] sm:text-xs text-gray-800 font-medium leading-tight">
                  {obat.aturan}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Catatan Tambahan */}
      <div className="max-w-7xl mx-auto">
        <CatatanBox />
      </div>
    </div>
  );
}