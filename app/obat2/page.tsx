"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import CatatanBox from "@/components/molecules/CatatanBox";

// Tipe Data Disesuaikan dengan JSON Strapi v5
interface GambarStrapi {
  id: number;
  url: string;
  name?: string;
  alternativeText?: string;
}

interface AturanPakaiChild {
  type: string;
  text: string;
}

interface AturanPakaiBlock {
  type: string;
  children?: AturanPakaiChild[];
}

interface ObatItem {
  id: number;
  documentId: string;
  Nama_Obat: string;
  Kegunaan: string;
  Aturan_pakai: AturanPakaiBlock[] | string;
  Kategori_obat: string | null;
  Slug: string;
  Gambar?: GambarStrapi;
  attributes?: any; // Untuk kompatibilitas v4 jika ada
}

export default function ObatObatanPage() {
  const [daftarObat, setDaftarObat] = useState<ObatItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchObatFromStrapi = async () => {
      try {
        const strapiBaseUrl =
          process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

        const response = await fetch(
          `${strapiBaseUrl}/api/obat-obatans?populate=*`
        );

        if (!response.ok) {
          throw new Error("Gagal mengambil data dari server Strapi");
        }

        const result = await response.json();
        setDaftarObat(result.data || []);
      } catch (err: any) {
        console.error("Error fetching obat:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchObatFromStrapi();
  }, []);

  // Helper untuk mengekstrak teks dari Rich Text Strapi v5
  const formatAturanPakai = (
    aturan: AturanPakaiBlock[] | string | undefined
  ): string => {
    if (!aturan) return "Tidak ada aturan khusus";
    if (typeof aturan === "string") return aturan;

    if (Array.isArray(aturan)) {
      return aturan
        .map(
          (block) => block.children?.map((child) => child.text).join("") || ""
        )
        .filter(Boolean)
        .join(" ");
    }

    return "Tidak ada aturan khusus";
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat px-4 sm:px-8 md:px-12 lg:px-16 pt-6 md:pt-10 pb-12 w-full overflow-x-hidden"
      style={{
        backgroundImage: "url('/images/background.png')",
      }}
    >
      {/* Hero Section */}
      <section className="bg-transparent">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
              <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-8">
      
                {/* Kiri */}
                <div className="max-w-2xl text-center lg:text-left">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0A405A] mb-4">
                    Obat - obatan
                  </h1>
      
                  <p className="text-gray-700 max-w-md text-sm md:text-base mx-auto lg:mx-0">
                  Daftar obat yang tersedia di UKS untuk membantu mengatasi keluhan
                  ringan.
                  </p>
                </div>
      
                {/* Kanan */}
                <div className="flex justify-center">
                  <Image
                    src="/images/obet.png"
                    alt="Ilustrasi Obat"
                    width={260}
                    height={220}
                    className="w-[180px] sm:w-[220px] lg:w-[260px] h-auto object-contain"
                    priority
                  />
                </div>
      
              </div>
      
            </div>
          </section>

      {loading && (
        <div className="text-center py-12 text-[#0A405A] font-semibold text-lg">
          Memuat data obat dari server...
        </div>
      )}

      {error && (
        <div className="text-center py-12 text-red-500 font-medium">
          Terjadi kesalahan: {error}
        </div>
      )}

      {/* Grid Card Obat */}
      {!loading && !error && (
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12">
          {daftarObat.map((item) => {
            const obat = item?.attributes || item;

            const nama = obat.Nama_Obat || obat.nama || "Obat";
            const tipe = obat.Kategori_obat || obat.tipe || "Umum";
            const desc = obat.Kegunaan || obat.desc || "Tidak ada deskripsi.";
            const aturanPakai = formatAturanPakai(
              obat.Aturan_pakai || obat.aturan
            );

            const pathGambar =
              obat?.Gambar?.url ||
              obat?.gambar?.data?.attributes?.url ||
              obat?.gambar?.url;
            const strapiUrl =
              process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
            let gambarUrl = "/images/paracetamol.png";

            if (pathGambar) {
              gambarUrl = pathGambar.startsWith("http")
                ? pathGambar
                : `${strapiUrl}${pathGambar}`;
            }

            return (
              <div
                key={item.id}
                className="bg-white p-5 rounded-3xl border border-gray-200 shadow-xl flex flex-col relative h-full hover:shadow-2xl transition-shadow duration-200"
              >
                {/* Bagian Atas Card (Gambar + Judul) */}
                <div className="flex gap-3 mb-4 items-start">
                  <div className="w-16 h-16 sm:w-20 sm:h-16 relative shrink-0">
                    <Image
                      src={gambarUrl}
                      alt={nama}
                      fill
                      className="object-cover"
                      unoptimized={true}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-sm sm:text-base text-gray-800 leading-tight mb-1">
                      {nama}
                    </h3>
                    <span className="text-[10px] sm:text-[11px] bg-blue-100 text-blue-700 px-2.5 py-0.5 rounded-md font-medium inline-block">
                      {tipe}
                    </span>
                  </div>
                </div>

                {/* Deskripsi / Kegunaan Obat */}
                <p className="text-xs text-gray-600 mb-4 flex-grow leading-relaxed">
                  {desc}
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
                      {aturanPakai}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Catatan Tambahan */}
      <div className="max-w-7xl mx-auto">
        <CatatanBox />
      </div>
    </div>
  );
}