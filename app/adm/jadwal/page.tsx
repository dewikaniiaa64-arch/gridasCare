'use client';

import { useState } from 'react';

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

export default function AdminJadwalPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [jadwalData, setJadwalData] = useState<SlotJadwal[]>(initialJadwalData);
  const [formData, setFormData] = useState({
    nama: '',
    jabatan: 'Anggota',
    hari: 'Senin',
    jam: '07:00-09:00',
  });

  const handleSimpan = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nama.trim()) {
      alert('Nama petugas wajib diisi!');
      return;
    }

    const dayKeyMap: Record<string, keyof Omit<SlotJadwal, 'jam'>> = {
      Senin: 'senin',
      Selasa: 'selasa',
      Rabu: 'rabu',
      Kamis: 'kamis',
      "Jum'at": 'jumat',
      Jumat: 'jumat',
    };

    const targetKey = dayKeyMap[formData.hari];

    setJadwalData((prevJadwal) =>
      prevJadwal.map((slot) => {
        if (slot.jam === formData.jam) {
          return {
            ...slot,
            [targetKey]: {
              nama: formData.nama,
              jabatan: formData.jabatan || 'Anggota',
            },
          };
        }
        return slot;
      })
    );

    alert('Jadwal petugas berhasil diperbarui!');
    setIsModalOpen(false);

    setFormData((prev) => ({ ...prev, nama: '' }));
  };

  return (
    <div className="flex flex-col min-h-screen bg-white font-inter">
      <main className="flex-1 p-8 bg-white overflow-x-auto">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-[#51A2FF]">
              Jadwal Petugas
            </h2>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-[#0D2840] text-white px-6 py-2.5 rounded-full font-semibold flex items-center gap-2 hover:bg-slate-800 transition shadow cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
              Edit Petugas
            </button>
          </div>

          {/* Grid 5 Kolom Utama (Diperlebar dengan min-w-[1100px] dan gap-5) */}
          <div className="grid grid-cols-5 gap-5 min-w-[1100px] w-full">
            {[
              { hari: 'Senin', key: 'senin' },
              { hari: 'Selasa', key: 'selasa' },
              { hari: 'Rabu', key: 'rabu' },
              { hari: 'Kamis', key: 'kamis' },
              { hari: "Jum'at", key: 'jumat' },
            ].map((item) => (
              <div
                key={item.hari}
                className="bg-[#93C5FD] rounded-2xl overflow-hidden shadow-md flex flex-col border border-blue-200"
              >
                {/* Header Hari */}
                <div className="bg-[#0D2840] text-white text-center py-3 font-bold text-base flex items-center justify-center gap-2">
                  <span>📅</span> {item.hari}
                </div>

                {/* List Card Petugas (px-5 py-3.5 agar lebar ke samping tanpa terlalu tinggi) */}
                <div className="flex flex-col divide-y divide-blue-300/60 flex-1">
                  {jadwalData.map((slot, idx) => {
                    const petugas = slot[item.key as keyof SlotJadwal] as Petugas;
                    return (
                      <div
                        key={idx}
                        className="px-5 py-3.5 flex flex-col justify-between hover:bg-blue-300/40 transition-colors"
                      >
                        <div>
                          {/* Jam Jaga */}
                          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-800 mb-2">
                            <span>🕒</span> {slot.jam}
                          </div>

                          {/* Profil Petugas */}
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-white text-xs shrink-0 shadow-xs">
                              👤
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="font-bold text-sm text-slate-900 leading-snug truncate">
                                {petugas.nama}
                              </p>
                              <p className="text-xs text-slate-700 font-medium mt-0.5">
                                {petugas.jabatan}
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
        </div>
      </main>

      {/* Modal Edit Petugas */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl relative border border-gray-100">
            {/* Tombol Back */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="text-sky-500 hover:text-sky-700 mb-2 inline-block cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                />
              </svg>
            </button>

            <h3 className="text-center text-sky-500 font-bold text-lg mb-6">
              Jadwal Petugas
            </h3>

            {/* Form Input */}
            <form onSubmit={handleSimpan} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Nama:
                </label>
                <input
                  type="text"
                  placeholder="Nama"
                  value={formData.nama}
                  onChange={(e) =>
                    setFormData({ ...formData, nama: e.target.value })
                  }
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-sky-500 text-black"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Jabatan:
                </label>
                <select
                  value={formData.jabatan}
                  onChange={(e) =>
                    setFormData({ ...formData, jabatan: e.target.value })
                  }
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-sky-500 bg-white text-black"
                >
                  <option value="Ketua">Ketua</option>
                  <option value="Wakil Ketua">Wakil Ketua</option>
                  <option value="Sekretaris">Sekretaris</option>
                  <option value="Bendahara">Bendahara</option>
                  <option value="Keamanan">Keamanan</option>
                  <option value="Anggota">Anggota</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Hari:
                </label>
                <select
                  value={formData.hari}
                  onChange={(e) =>
                    setFormData({ ...formData, hari: e.target.value })
                  }
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-sky-500 bg-white text-black"
                >
                  <option value="Senin">Senin</option>
                  <option value="Selasa">Selasa</option>
                  <option value="Rabu">Rabu</option>
                  <option value="Kamis">Kamis</option>
                  <option value="Jum'at">Jum'at</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Jam:
                </label>
                <select
                  value={formData.jam}
                  onChange={(e) =>
                    setFormData({ ...formData, jam: e.target.value })
                  }
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-sky-500 bg-white text-black"
                >
                  <option value="07:00-09:00">07:00-09:00</option>
                  <option value="09:00-11:00">09:00-11:00</option>
                  <option value="11:00-13:00">11:00-13:00</option>
                  <option value="13:00-15:00">13:00-15:00</option>
                </select>
              </div>

              <div className="pt-2 flex justify-center">
                <button
                  type="submit"
                  className="bg-[#2563EB] text-white font-bold py-2 px-8 rounded-full text-xs hover:bg-blue-700 transition shadow-md active:scale-95 cursor-pointer"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}