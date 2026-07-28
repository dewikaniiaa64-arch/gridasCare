import React from 'react';
import Image from 'next/image';
import { CalendarDays, Clock3 } from 'lucide-react';

type Props = {
  hari: string;
  items: any[];
};

export default function JadwalCard({ hari, items }: Props) {
  // Format jam "07:00:00.000" -> "07.00"
  const formatJam = (jamStr: string) => {
    if (!jamStr) return '';
    return jamStr.substring(0, 5).replace(':', '.');
  };

  return (
    <div className="w-full rounded-[22px] overflow-hidden shadow-lg bg-[#6C9BE6]/75 backdrop-blur-md border border-white/20 flex flex-col">
      {/* Header Hari */}
      <div className="relative bg-[#233863] h-11 flex items-center justify-center px-4">
        <CalendarDays size={16} className="absolute left-4 text-white" />
        <span className="text-white font-bold text-sm lg:text-[16px]">
          {hari}
        </span>
      </div>

      {/* List Petugas */}
      <div className="p-3 flex-1 flex flex-col justify-start gap-1">
        {items.length > 0 ? (
          items.map((item, index) => {
            const data = item?.attributes || item;
            const nama = data.Nama || data.nama || '-';
            const jabatan = data.Jabatan || data.jabatan || 'Anggota';
            const jamMulai = formatJam(data.Jam_Mulai || data.jam_mulai);
            const jamSelesai = formatJam(data.Jam_Selesai || data.jam_selesai);

            return (
              <div
                key={item.id || index}
                className="py-2 border-b border-white/20 last:border-none"
              >
                {/* Waktu Piket */}
                <div className="flex items-center gap-1.5 text-white/90 text-[11px] font-medium mb-1">
                  <Clock3 size={13} className="text-white/80 shrink-0" />
                  <span>
                    {jamMulai} - {jamSelesai}
                  </span>
                </div>

                {/* Profil Petugas */}
                <div className="flex items-center gap-2.5">
                  {/* Icon Person Hitam Pekat */}
                  <div className="w-6 h-6 flex items-center justify-center shrink-0">
                    <svg
                      className="w-5 h-5 text-black fill-current"
                      viewBox="0 0 24 24"
                    >
                      <circle cx="12" cy="7" r="4.5" />
                      <path d="M12 13c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5z" />
                    </svg>
                  </div>

                  {/* Nama & Jabatan */}
                  <div className="min-w-0 flex-1">
                    <h3 className="text-white text-xs lg:text-[13px] font-bold leading-tight truncate">
                      {nama}
                    </h3>
                    <p className="text-white/80 text-[10px] lg:text-[11px] font-normal leading-tight mt-0.5 truncate">
                      {jabatan}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center text-white/70 text-xs py-8 italic">
            Tidak ada piket
          </div>
        )}
      </div>
    </div>
  );
}