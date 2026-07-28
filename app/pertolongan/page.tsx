"use client";

import { useState } from "react";
import HeroPertolongan from "@/app/components/pertolongan/HeroPertolongan";
import PertolonganCard from "@/app/components/pertolongan/PertolonganCard";
import WarningBox from "@/app/components/pertolongan/WarningBox";

export default function Pertolongan() {

  const [selected, setSelected] = useState<{
  title: string;
  image: string;
  steps: string[];
} | null>(null);

  return (
  <main
    className="min-h-screen bg-cover bg-center bg-no-repeat"
    style={{
      backgroundImage: "url('/images/background.png')",
    }}>
      
      <HeroPertolongan />
      <section className="pt-3 pb-4">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-5 text-center lg:text-left">
      Panduan Cepat
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">

      <PertolonganCard
  title="Luka Ringan"
  description="Cara membersihkan dan merawat luka ringan dengan aman."
  image="/images/luka.png"
  onClick={() =>
    setSelected({
      title: "Luka Ringan",
      image: "/images/luka.png",
      steps: [
      "Bersihkan luka dari kotoran menggunakan air bersih.",
      "Oleskan salep antibiotik atau petroleum jelly untuk mencegah infeksi dan menjaga kelembapan.",
      "Lalu tutup dengan perban atau plester.",
      ],
    })
  }
/>

      <PertolonganCard
        title="Mimisan"
        description="Langkah-langkah menghentikan mimisan dengan benar."
        image="/images/mimisan.png"
onClick={() =>
    setSelected({
      title: "Mimisan",
      image: "/images/mimisan.png",
      steps: [
      "Saat Duduk tegak, condongkan tubuh sedikit ke depan untuk mencegah darah tertelan.",
      "Tekan cuping hidung (bagian lunak hidung) menggunakan ibu jari dan telunjuk selama 10-15 menit, bernapaslah lewat mulut.",
      "Kompres dingin pangkal hidung untuk memperlambat perdarahan mengalami keseleo atau terkilir.",
      ],
    })
  }
/>      

      <PertolonganCard
        title="Keseleo"
        description="Cara penanganan pertama saat mengalami keseleo."
        image="/images/keseleo.png"
        onClick={() =>
    setSelected({
      title: "Keseleo",
      image: "/images/keseleo.png",
      steps: [
      "Metode RICE: Rest (istirahatkan sendi dari beban).",
      "Ice (kompres es 15-20 menit).",
      "Compression (balut dengan perban elastis).",
      "dan Elevation (posisikan area cedera lebih tinggi dari jantung).",
      "Hindari langsung mengurut atau memijat area yang cedera.",
      ],
    })
  }
/>

      <PertolonganCard
        title="Pingsan"
        description="Langkah pertolongan pertama saat seseorang pingsan."
        image="/images/pingsan.png"
        onClick={() =>
    setSelected({
      title: "Pingsan",
      image: "/images/pingsan.png",
      steps: [
      "Pindahkan ke tempat aman baringkan di tempat datar.",
      "Tinggikan posisi kaki angkat sekitar 30 cm lebih tinggi dari dada.",
      "Longgarkan pakaian (buka kancing kerah baju atau longgarkan ikat pinggang).",
      "Cek kesadaran pernapasan (tepuk bahu atau dada perlahan,cek apakah ada hembusan pernapasan).",
      "Posisikan miring jika muntah.",
      "Rangsang kesadaran berikan bau-bauan yang menyengat.",
      ],
    })
  }
/>

      <PertolonganCard
        title="Sengatan Serangga"
        description="Pertolongan pertama saat terkena sengatan serangga."
        image="/images/serangga.png"
        onClick={() =>
    setSelected({
      title: "Sengatan Serangga",
      image: "/images/serangga.png",
      steps: [
      "Segera singkirkan serangga atau sengat yang tertinggal (jika ada) dengan benda datar (seperti kartu).",
      "Cuci area yang disengat dengan air dan sabun.",
      "Lalu kompres dingin selama 10 menit untuk meredakan bengkak.",
      "Oleskan krim kalamin atau hidrokortison dan minum obat pereda nyeri jika diperlukan.",
      ],
    })
  }
/>

    </div>

  </div>
</section>
<WarningBox/>
{selected && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

    <div className="bg-[#3A5A78] rounded-3xl w-[90%] max-w-[420px] p-5 sm:p-8 relative shadow-2xl">

      {/* Tombol Tutup */}
      <button
        onClick={() => setSelected(null)}
        className="absolute top-5 left-5 text-white text-3xl hover:scale-110 transition"
      >
        ←
      </button>

      {/* Gambar */}
      <div className="flex justify-center">
        <div className="w-28 h-28 rounded-full bg-white flex items-center justify-center shadow-lg">

          <img
            src={selected.image}
            alt={selected.title}
            className="w-150 h-150 object-contain"
          />

        </div>
      </div>

      {/* Judul */}
      <h2 className="text-center text-white text-2xl sm:text-3xl font-bold mt-6">
        {selected.title}
      </h2>

      {/* Langkah */}
      <ol className="text-white mt-6 space-y-3 list-decimal pl-6 leading-6 text-sm sm:text-base">

        {selected.steps.map((step, index) => (
          <li key={index}>
            {step}
          </li>
        ))}

      </ol>

    </div>

  </div>
)}
        </main>
  );
}