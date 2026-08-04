'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import CatatanBox from '@/app/components/obatobatan/CatatanBox';

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
        const response = await fetch('https://bmkvr3zj-1337.asse.devtunnels.ms/api/obat-obatans?populate=*');

        if (!response.ok) {
          throw new Error('Gagal mengambil data dari server Strapi');
        }

        const result = await response.json();
        setDaftarObat(result.data || []);
      } catch (err: any) {
        console.error('Error fetching obat:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchObatFromStrapi();
  }, []);

  // Helper untuk mengekstrak teks dari Rich Text Strapi v5
  const formatAturanPakai = (aturan: AturanPakaiBlock[] | string | undefined): string => {
    if (!aturan) return 'Tidak ada aturan khusus';
    if (typeof aturan === 'string') return aturan;

    if (Array.isArray(aturan)) {
      return aturan
        .map((block) => block.children?.map((child) => child.text).join('') || '')
        .filter(Boolean)
        .join(' ');
    }

    return 'Tidak ada aturan khusus';
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat px-4 sm:px-8 md:px-12 lg:px-16 pt-6 md:pt-10 pb-12 w-full overflow-x-hidden"
      style={{
        backgroundImage: "url('/images/background.png')",
      }}
    >
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between mb-10 md:mb-12 gap-6">
        <div className="text-center md:text-left flex flex-col items-center md:items-start max-w-md">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0A405A] mb-3">
            Obat - Obatan
          </h1>

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

        <div className="hidden md:block w-72 lg:w-80 h-44 relative shrink-0">
          <Image
            src="/images/obet.png"
            alt="Ilustrasi Obat"
            fill
            className="object-contain"
          />
        </div>
      </div>

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
            // MENDUKUNG STRAPI v5 & v4
            const obat = item?.attributes || item;

            // 1. Ambil Nama
            const nama = obat.Nama_Obat || obat.nama || 'Obat';

            // 2. Ambil Kategori / Tipe
            const tipe = obat.Kategori_obat || obat.tipe || 'Umum';

            // 3. Ambil Deskripsi / Kegunaan
            const desc = obat.Kegunaan || obat.desc || 'Tidak ada deskripsi.';

            // 4. Ambil Aturan Pakai
            const aturanPakai = formatAturanPakai(obat.Aturan_pakai || obat.aturan);

            // 5. Penanganan URL Gambar yang Presisi
            const pathGambar =
              obat?.Gambar?.url ||
              obat?.gambar?.data?.attributes?.url ||
              obat?.gambar?.url;

            let gambarUrl = '/images/paracetamol.png'; // Fallback default

            if (pathGambar) {
              gambarUrl = pathGambar.startsWith('http')
                ? pathGambar
                : `http://localhost:1337${pathGambar}`;
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
                      className="object-contain"
                      unoptimized={gambarUrl.startsWith('http://localhost:1337')}
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