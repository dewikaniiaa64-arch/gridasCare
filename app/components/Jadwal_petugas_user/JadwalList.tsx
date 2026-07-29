// File: src/app/components/Jadwal_petugas_user/JadwalList.tsx

import React from 'react';

interface Petugas {
  nama: string;
  jabatan: string;
}

interface SlotJadwal {
  jam: string;
  senin: Petugas;
  selasa: Petugas;
  rabu: Petugas;
  kamis: Petugas;
  jumat: Petugas;
}

const initialJadwalData: SlotJadwal[] = [
  {
    jam: '07:00-09:00',
    senin: { nama: 'Syrin Alya Nafisa', jabatan: 'Wakil Ketua' },
    selasa: { nama: 'Zhao Yu', jabatan: 'Bendahara' },
    rabu: { nama: 'Rizka Adistiyanti J', jabatan: 'Anggota' },
    kamis: { nama: 'Kirana Kalisha', jabatan: 'Anggota' },
    jumat: { nama: 'Zaki Arya P', jabatan: 'Anggota' },
  },
  {
    jam: '09:00-11:00',
    senin: { nama: 'Nashylla Nur S', jabatan: 'Sekretaris' },
    selasa: { nama: 'Cantika Khoerun N', jabatan: 'Keamanan' },
    rabu: { nama: 'Anggraeni Ayu', jabatan: 'Anggota' },
    kamis: { nama: 'Imelda Novianti', jabatan: 'Anggota' },
    jumat: { nama: 'Zhang Linghe', jabatan: 'Anggota' },
  },
  {
    jam: '11:00-13:00',
    senin: { nama: 'Kania Dewi', jabatan: 'Ketua' },
    selasa: { nama: 'Annisa Nabila V', jabatan: 'Anggota' },
    rabu: { nama: 'Ira Maulida', jabatan: 'Anggota' },
    kamis: { nama: 'Cici Wahyuningsih', jabatan: 'Anggota' },
    jumat: { nama: 'Zhou Yiran', jabatan: 'Anggota' },
  },
  {
    jam: '13:00-15:00',
    senin: { nama: 'Aila Shinta', jabatan: 'Anggota' },
    selasa: { nama: 'Sherya Demiya', jabatan: 'Anggota' },
    rabu: { nama: 'Diyah Siti F', jabatan: 'Anggota' },
    kamis: { nama: 'Riska Mufika', jabatan: 'Anggota' },
    jumat: { nama: 'Lu Yixiao', jabatan: 'Anggota' },
  },
];

export default function JadwalList({ jadwalList }: { jadwalList: any[] }) {
  // Format ulang data dari Strapi
  const structuredJadwal = structuredClone(initialJadwalData);

  if (jadwalList && jadwalList.length > 0) {
    jadwalList.forEach((item: any) => {
      const attr = item.attributes || item;
      const targetSlot = structuredJadwal.find((s) => s.jam === attr.jam);

      if (targetSlot && attr.hari) {
        const dayKey = attr.hari.toLowerCase().replace("'", '') as keyof Omit<SlotJadwal, 'jam'>;
        if (targetSlot[dayKey]) {
          targetSlot[dayKey] = {
            nama: attr.nama || '-',
            jabatan: attr.jabatan || 'Anggota',
          };
        }
      }
    });
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 md:overflow-x-auto md:pb-4 w-full justify-center">
      {[
        { hari: 'Senin', key: 'senin' },
        { hari: 'Selasa', key: 'selasa' },
        { hari: 'Rabu', key: 'rabu' },
        { hari: 'Kamis', key: 'kamis' },
        { hari: "Jum'at", key: 'jumat' },
      ].map((item) => (
        <div
          key={item.hari}
          className="bg-[#93C5FD] rounded-2xl overflow-hidden shadow-md flex flex-col border border-blue-200 w-full max-w-sm md:max-w-none md:w-[260px] md:min-w-[260px] md:shrink-0 mx-auto md:mx-0"
        >
          {/* Header Hari */}
          <div className="bg-[#0D2840] text-white text-center py-3 font-bold text-base flex items-center justify-center gap-2">
            <span>📅</span> {item.hari}
          </div>

          {/* List Card Petugas */}
          <div className="flex flex-col divide-y divide-blue-300/60 flex-1">
            {structuredJadwal.map((slot, idx) => {
              const petugas = slot[item.key as keyof SlotJadwal] as Petugas;
              return (
                <div key={idx} className="px-5 py-3.5 flex flex-col justify-between hover:bg-blue-300/40 transition-colors">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-800 mb-2">
                      <span>🕒</span> {slot.jam}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-white text-xs shrink-0 shadow-xs">
                        👤
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-bold text-sm text-slate-900 leading-snug truncate">
                          {petugas?.nama || '-'}
                        </p>
                        <p className="text-xs text-slate-700 font-medium mt-0.5">
                          {petugas?.jabatan || '-'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}