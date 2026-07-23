type JadwalItem = {
  jam: string;
  nama: string;
  jabatan: string;
};

type Props = {
  hari: string;
  jadwal?: JadwalItem[];
};

export default function JadwalCard({ hari, jadwal = [] }: Props) {
  // Jika jadwal kosong, kita buat data tiruan agar terlihat isi seperti di Figma
  const displayJadwal = jadwal.length > 0 ? jadwal : [
    { jam: "07:00-09:00", nama: "Fitri", jabatan: "Ketua" },
    { jam: "09:00-11:00", nama: "Selma", jabatan: "Anggota" },
    { jam: "11:00-13:00", nama: "Farhan", jabatan: "Anggota" },
    { jam: "13:00-15:00", nama: "Restu", jabatan: "Anggota" },
  ];

  return (
    <div className="bg-[#a3cfff] rounded-2xl shadow-lg overflow-hidden border border-blue-300 w-full">
      {/* Header Kartu (Biru Tua) */}
      <div className="bg-[#2c4e75] text-white p-3 text-center font-bold text-lg flex items-center justify-center gap-2">
        <span>📅</span> {/* Ganti dengan icon calendar jika ada */}
        {hari}
      </div>

      {/* List Petugas */}
      <div className="p-3 flex flex-col gap-3">
        {displayJadwal.map((item, index) => (
          <div key={index} className="text-[#1e3a5f] border-b border-blue-200/50 last:border-0 pb-2 last:pb-0">
            {/* Jam */}
            <div className="flex items-center gap-1 text-xs font-semibold text-blue-900/80 mb-1">
              <span>🕒</span> {item.jam}
            </div>
            {/* Nama & Jabatan */}
            <div className="flex items-start gap-2 pl-1">
              <span className="text-lg">👤</span>
              <div>
                <p className="text-sm font-bold leading-tight">{item.nama}</p>
                <p className="text-xs text-blue-800/90">{item.jabatan}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}