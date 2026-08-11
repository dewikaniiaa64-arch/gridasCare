'use client';

import { useEffect, useState } from 'react';
import HeroJadwal from '@/app/components/Jadwal_petugas_user/HeroJadwal';
import JadwalList from '@/app/components/Jadwal_petugas_user/JadwalList';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

export default function JadwalPetugasUserPage() {
  const [jadwalList, setJadwalList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJadwalFromStrapi = async () => {
      try {
        const response = await fetch(`${STRAPI_URL}/api/jadwal-piket-ukss?populate=*`);

        if (!response.ok) {
          throw new Error('Gagal mengambil data jadwal dari Strapi');
        }

        const result = await response.json();
        const rawData = result.data || [];

        // Normalisasi data dari Strapi agar sesuai dengan kebutuhan komponen User/List
        const formattedData = rawData.map((item: any) => {
          // Menyesuaikan jika menggunakan Strapi v4 (attributes) atau v5 (flat)
          const attr = item.attributes || item;

          // Format jam dari "07:00:00.000" menjadi "07:00"
          const formatTime = (timeStr: string) => {
            if (!timeStr) return '';
            return timeStr.slice(0, 5);
          };

          const jamMulai = formatTime(attr.Jam_Mulai);
          const jamSelesai = formatTime(attr.Jam_Selesai);
          const jamSlot = jamMulai && jamSelesai ? `${jamMulai}-${jamSelesai}` : (attr.jam || '');

          return {
            id: item.id,
            hari: attr.Hari || attr.hari,
            jam: jamSlot,
            nama: attr.Nama || attr.nama,
            jabatan: attr.Jabatan || attr.jabatan,
          };
        });

        setJadwalList(formattedData);
      } catch (err: any) {
        console.error('Error fetching jadwal:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJadwalFromStrapi();
  }, []);

  return (
    <main
      className="min-h-screen bg-cover bg-center bg-no-repeat px-4 sm:px-6 lg:px-8 pt-4 pb-12 w-full flex flex-col justify-start"
      style={{
        backgroundImage: "url('/images/background.png')",
      }}
    >
      {/* Banner / Hero Section */}
      <HeroJadwal />

      {/* Konten Utama Tampilan User */}
      <div className="w-full max-w-[1400px] mx-auto mt-4 px-2">
        {loading && (
          <div className="text-center py-12 text-[#0A405A] font-semibold">
            Memuat data jadwal piket...
          </div>
        )}

        {error && (
          <div className="text-center py-12 text-red-500 font-medium">
            Terjadi kesalahan: {error}
          </div>
        )}

        {!loading && !error && <JadwalList jadwalList={jadwalList} />}
      </div>
    </main>
  );
}