'use client';
import Image from 'next/image';
import CatatanBox from "@/app/components/obatobatan/CatatanBox";

export default function ObatObatanPage() {
  const daftarObat = [
    { 
      nama: "Paracetamol 500 mg", gambar: "/images/paracetamol.png", tipe: "Tablet", 
      desc: "Di gunakan untuk meredakan demam dan nyeri ringan seperti sakit kepala.", 
      aturan: "1 tablet, 3 kali 1 hari sesudah makan." 
    },
    { 
      nama: "CTM 4 mg", gambar: "/images/ctm.png", tipe: "Tablet", 
      desc: "CTM 4 mg adalah obat antihistamin yang berfungsi untuk meredakan gejala alergi, seperti gatal-gatal, biduran, bersin, dll.", 
      aturan: "1 tablet, 3-4 kali sehari bila diperlukan." 
    },
    { 
      nama: "Diapet", gambar: "/images/diap0t.png", tipe: "Kapsul", 
      desc: "Diapet adalah obat herbal yang digunakan untuk membantu mengatasi diare, mengurangi frekuensi buang air besar, dan membantu memadatkan feses.", 
      aturan: "2 kapsul, 2 kali sehari setelah makan." 
    },
    { 
      nama: "Promag", gambar: "/images/promag.png", tipe: "Tablet Kunyah", 
      desc: "Promag adalah obat antasida yang digunakan untuk meredakan gejala maag akibat asam lambung berlebih.", 
      aturan: "1-2 tablet kunyah, 3-4 kali sehari, sebelum makan." 
    },
    { 
      nama: "Bodrex", gambar: "/images/bodrex.png", tipe: "Tablet", 
      desc: "Bodrex adalah obat yang digunakan untuk meredakan sakit kepala, demam, dan nyeri ringan, seperti nyeri otot, nyeri gigi, atau pegal-pegal.", 
      aturan: "1 tablet, 3 kali sehari atau sesuai kebutuhan." 
    },
    { 
      nama: "Betadine", gambar: "/images/betadin.png", tipe: "Cairan", 
      desc: "Betadine adalah antiseptik yang mengandung povidone-iodine untuk mencegah dan mengatasi infeksi pada luka ringan, seperti luka lecet, luka gores, luka sayat kecil, dan luka bakar ringan.", 
      aturan: "Oleskan Betadine secukupnya pada area luka 1-3 kali sehari." 
    },
    { 
      nama: "Salep 88", gambar: "/images/salep.png", tipe: "Salep", 
      desc: "Salep 88 adalah obat luar yang digunakan untuk membantu mengatasi penyakit kulit akibat infeksi jamur.", 
      aturan: "Oleskan salep tipis-tipis pada bagian yang terkena 2-3 kali sehari." 
    },
    { 
      nama: "Hansaplast", gambar: "/images/hansaplas.png", tipe: "Plester Luka", 
      desc: "Digunakan untuk menutup luka kecil agar tetap bersih dan terlindungi.", 
      aturan: "Tempelkan pada luka yang sudah dibersihkan." 
    },
  ];

  return (
    <div
  className="min-h-screen bg-cover bg-center bg-no-repeat px-8 pt-8 pb-0"
  style={{
    backgroundImage: "url('/images/background.png')",
  }}
>
      {/* Hero Section (Judul dikembalikan) */}
      <div className="flex items-center justify-between mb-12">
        <div>
          <h1 className="text-5xl font-bold text-[#0A405A] mb-4">Obat-obatan</h1>
          <p className="text-gray-700 mb-8 max-w-md text-sm md:text-base">Daftar obat yang tersedia di uks untuk membantu mengatasi keluhan ringan</p>
        </div>
        <div className="hidden md:block w-80 h-40 relative">
          <Image src="/images/obet.png" alt="Ilustrasi Obat" fill className="object-contain" />
        </div>
      </div>

      {/* Grid Obat */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        {daftarObat.map((obat, idx) => (
          <div key={idx} className="bg-white p-5 rounded-3xl border border-gray-200 shadow-xl flex flex-col relative h-full">
            <div className="flex gap-3 mb-4">
              <div className="w-20 h-16 relative shrink-0">
                <Image src={obat.gambar} alt={obat.nama} fill className="object-contain" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-sm text-gray-800 leading-tight mb-1">{obat.nama}</h3>
                <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-md font-medium inline-block">{obat.tipe}</span>
              </div>
            </div>

            <p className="text-[11px] text-gray-600 mb-4 flex-grow leading-snug">{obat.desc}</p>
            
            <div className="bg-blue-100/50 p-3 rounded-full flex gap-2 items-center mt-auto border border-blue-200">
              <div className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] shrink-0 font-bold">i</div>
              <div>
                <p className="text-[9px] font-bold text-blue-900 uppercase">Aturan pakai:</p>
                <p className="text-[10px] text-gray-800 font-medium leading-tight">{obat.aturan}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <CatatanBox />
    </div>
  );
}