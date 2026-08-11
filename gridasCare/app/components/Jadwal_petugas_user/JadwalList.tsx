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
    jam: '07:00 - 09:00',
    senin: { nama: 'Syrin Alya Nafisa', jabatan: 'Wakil Ketua' },
    selasa: { nama: 'Zhao Yu', jabatan: 'Bendahara' },
    rabu: { nama: 'Rizka Adistiyanti J', jabatan: 'Anggota' },
    kamis: { nama: 'Kirana Kalisha', jabatan: 'Anggota' },
    jumat: { nama: 'Zaki Arya P', jabatan: 'Anggota' },
  },
  {
    jam: '09:00 - 11:00',
    senin: { nama: 'Nashylla Nur S', jabatan: 'Sekretaris' },
    selasa: { nama: 'Cantika Khoerun N', jabatan: 'Keamanan' },
    rabu: { nama: 'Anggraeni Ayu', jabatan: 'Anggota' },
    kamis: { nama: 'Imelda Novianti', jabatan: 'Anggota' },
    jumat: { nama: 'Zhang Linghe', jabatan: 'Anggota' },
  },
  {
    jam: '11:00 - 13:00',
    senin: { nama: 'Kania Dewi', jabatan: 'Ketua' },
    selasa: { nama: 'Annisa Nabila V', jabatan: 'Anggota' },
    rabu: { nama: 'Ira Maulida', jabatan: 'Anggota' },
    kamis: { nama: 'Cici Wahyuningsih', jabatan: 'Anggota' },
    jumat: { nama: 'Zhou Yiran', jabatan: 'Anggota' },
  },
  {
    jam: '13:00 - 15:00',
    senin: { nama: 'Aila Shinta', jabatan: 'Anggota' },
    selasa: { nama: 'Sherya Demiya', jabatan: 'Anggota' },
    rabu: { nama: 'Diyah Siti F', jabatan: 'Anggota' },
    kamis: { nama: 'Riska Mufika', jabatan: 'Anggota' },
    jumat: { nama: 'Lu Yixiao', jabatan: 'Anggota' },
  },
];

export default function JadwalList({ jadwalList }: { jadwalList: any[] }) {
  const structuredJadwal = structuredClone(initialJadwalData);

  if (jadwalList && jadwalList.length > 0) {
    jadwalList.forEach((item: any) => {
      const attr = item.attributes || item;

      const rawHari = attr.Hari || attr.hari || "";
      const rawNama = attr.Nama || attr.nama;
      const rawJabatan = attr.Jabatan || attr.jabatan;

      // Ambil 5 karakter jam ("07:00")
      let jamMulai = "";
      if (attr.Jam_Mulai) {
        jamMulai = String(attr.Jam_Mulai).slice(0, 5);
      } else if (attr.jam) {
        jamMulai = String(attr.jam).split("-")[0].trim();
      }

      // Cari slot yang jam awalnya sama
      const targetSlot = structuredJadwal.find((s) => s.jam.startsWith(jamMulai));

      if (targetSlot && rawHari) {
        const dayKey = rawHari
          .toLowerCase()
          .trim()
          .replace("'", "")
          .replace("’", "") as keyof Omit<SlotJadwal, 'jam'>;

        if (targetSlot[dayKey] !== undefined) {
          targetSlot[dayKey] = {
            nama: rawNama || '-',
            jabatan: rawJabatan || 'Anggota',
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
          <div className="bg-blue-950 text-white p-4 font-bold text-lg relative flex items-center justify-center">
            <img
              src="/images/kalender1.png"
              alt="Calendar"
              className="w-8 absolute left-4"
            />
            <span>{item.hari}</span>
          </div>

          <div className="flex flex-col divide-y divide-blue-300/60 flex-1">
            {structuredJadwal.map((slot, idx) => {
              const petugas = slot[item.key as keyof SlotJadwal] as Petugas;
              return (
                <div key={idx} className="px-5 py-3.5 flex flex-col justify-between hover:bg-blue-300/40 transition-colors">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-800 mb-2">
                      <svg width="20" height="20" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <ellipse cx="15" cy="15" rx="12.5" ry="12.5" stroke="#07479B" strokeWidth="1.5" />
                        <path d="M15 10V15L17.5 17.5" stroke="#07479B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span>{slot.jam}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex gap-3 items-center">
                        <img src="/images/icon1.png" alt="Icon" className="w-16 h-16 object-cover" />
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