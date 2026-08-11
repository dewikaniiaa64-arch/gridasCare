"use client";

import { useEffect, useState } from "react";
import HeroPertolongan from "@/app/components/pertolongan/HeroPertolongan";
import PertolonganCard from "@/app/components/pertolongan/PertolonganCard";
import WarningBox from "@/app/components/pertolongan/WarningBox";

export default function PertolonganPage() {
  const [daftarPertolongan, setDaftarPertolongan] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [selected, setSelected] = useState<{
    title: string;
    image: string;
    steps: string[];
  } | null>(null);

  useEffect(() => {
    const fetchPertolonganFromStrapi = async () => {
      try {
        const response = await fetch('http://localhost:1337/api/pertolongan-pertamas?populate=*');

        if (!response.ok) {
          throw new Error('Gagal mengambil data dari server Strapi');
        }

        const result = await response.json();
        setDaftarPertolongan(result.data || []);
      } catch (err: any) {
        console.error('Error fetching pertolongan pertama:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPertolonganFromStrapi();
  }, []);

  // Helper konversi Rich Text 'Panduan' dari Strapi menjadi array steps
  const parsePanduanToSteps = (panduanBlocks: any[]): string[] => {
    if (!panduanBlocks || !Array.isArray(panduanBlocks)) return [];

    const steps: string[] = [];

    panduanBlocks.forEach((block: any) => {
      if (block.type === 'list' && Array.isArray(block.children)) {
        block.children.forEach((listItem: any) => {
          if (listItem.children) {
            const text = listItem.children.map((child: any) => child.text).join('').trim();
            if (text) steps.push(text);
          }
        });
      } else if (block.type === 'paragraph' && Array.isArray(block.children)) {
        const text = block.children.map((child: any) => child.text).join('').trim();
        if (text) steps.push(text);
      }
    });

    return steps;
  };

  return (
    <main
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/images/background.png')",
      }}
    >
      <HeroPertolongan />

      <section className="pt-3 pb-4">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-5">
            Panduan Cepat
          </h2>

          {loading && (
            <div className="text-center py-10 text-[#0A405A] font-medium">
              Memuat data...
            </div>
          )}

          {error && (
            <div className="text-center py-10 text-red-500 font-medium">
              Terjadi kesalahan: {error}
            </div>
          )}

          {!loading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
              {daftarPertolongan.map((item) => {
                const data = item?.attributes || item;

                const title = data.Nama || data.nama || 'Pertolongan Pertama';
                const description = (data.Deskripsi || data.deskripsi || '').replace(/\n/g, ' ');
                const steps = parsePanduanToSteps(data.Panduan || data.panduan);

                // URL Gambar Strapi
                const pathGambar =
                  data?.Gambar?.url ||
                  data?.gambar?.data?.attributes?.url ||
                  data?.gambar?.url;

                let image = '/images/luka.png'; // Fallback

                if (pathGambar) {
                  image = pathGambar.startsWith('http')
                    ? pathGambar
                    : `http://localhost:1337${pathGambar}`;
                }

                return (
                  <PertolonganCard
                    key={item.id}
                    title={title}
                    description={description}
                    image={image}
                    onClick={() =>
                      setSelected({
                        title,
                        image,
                        steps,
                      })
                    }
                  />
                );
              })}
            </div>
          )}
        </div>
      </section>

      <WarningBox />

      {/* Pop-up / Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#3A5A78] rounded-3xl w-[420px] p-8 relative shadow-2xl animate-[fadeIn_.3s_ease]">
            {/* Tombol Tutup */}
            <button
              onClick={() => setSelected(null)}
              className="absolute top-5 left-5 text-white text-3xl hover:scale-110 transition"
            >
              ←
            </button>

            {/* Gambar */}
            <div className="flex justify-center">
              <div className="w-28 h-28 rounded-full bg-white flex items-center justify-center shadow-lg p-2">
                <img
                  src={selected.image}
                  alt={selected.title}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Judul */}
            <h2 className="text-center text-white text-3xl font-bold mt-6">
              {selected.title}
            </h2>

            {/* Langkah */}
            <ol className="text-white mt-8 space-y-3 list-decimal pl-6 leading-7">
              {selected.steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </main>
  );
}