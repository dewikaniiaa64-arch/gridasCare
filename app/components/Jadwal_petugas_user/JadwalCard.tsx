import React from 'react';
import Image from 'next/image';

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
        {/* Gambar Kalender Kustom */}
        <div className="absolute left-4 w-5 h-5 flex items-center justify-center">
           <img
    src="/images/kalender1.png"
    alt="Calendar"
    className="w-8 absolute left-4"
  />
        </div>
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
                {/* Waktu Piket dengan Gambar Jam Kustom */}
                <div className="flex items-center gap-1.5 text-white/90 text-[11px] font-medium mb-1">
                 <svg
    width="20"
    height="20"
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <ellipse
      cx="15"
      cy="15"
      rx="12.5"
      ry="12.5"
      stroke="#07479B"
      strokeWidth="1.5"
    />
    <path
      d="M15 10V15L17.5 17.5"
      stroke="#07479B"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
                  <span>
                    {jamMulai} - {jamSelesai}
                  </span>
                </div>

                {/* Profil Petugas */}
                <div className="flex items-center gap-2.5">
                  {/* Icon Person Hitam Pekat */}
                  <div className="w-6 h-6 flex items-center justify-center shrink-0">
                    <img
  src="/images/icon1.png"
  alt="Icon"
  className="w-16 h-16 object-cover"
/>
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