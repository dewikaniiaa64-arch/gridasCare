'use client';

import { useState, useEffect } from 'react';

export default function AdminJadwalPage() {
  const [dataJadwal, setDataJadwal] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  const fetchJadwal = async () => {
    try {
      setLoading(true);
      setErrorMsg('');
      
      const res = await fetch('http://localhost:1337/api/jadwal-piket-ukss');
      
      if (!res.ok) {
        throw new Error(`Gagal mengambil data, Status: ${res.status}`);
      }

      const result = await res.json();
      const rawData = result.data || [];

      // Urutan hari untuk referensi sorting
      const urutanHari: { [key: string]: number } = {
        'Senin': 1,
        'Selasa': 2,
        'Rabu': 3,
        'Kamis': 4,
        "Jum'at": 5,
        'Jumat': 5,
      };

      // Fungsi sorting berdasarkan Hari lalu berdasarkan Jam_Mulai
      const sortedData = rawData.sort((a: any, b: any) => {
        const hariA = urutanHari[a.Hari] || 99;
        const hariB = urutanHari[b.Hari] || 99;

        if (hariA !== hariB) {
          return hariA - hariB;
        }

        // Jika hari sama, urutkan berdasarkan Jam_Mulai
        const jamA = a.Jam_Mulai || '';
        const jamB = b.Jam_Mulai || '';
        return jamA.localeCompare(jamB);
      });

      setDataJadwal(sortedData);
    } catch (error: any) {
      console.error('Error fetching jadwal:', error);
      setErrorMsg(error.message || 'Terjadi kesalahan koneksi ke server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJadwal();
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus jadwal ini?')) {
      try {
        const res = await fetch(`http://localhost:1337/api/jadwal-piket-ukss/${id}`, {
          method: 'DELETE',
        });

        if (res.ok) {
          fetchJadwal();
        } else {
          alert('Gagal menghapus data dari server.');
        }
      } catch (error) {
        console.error('Terjadi kesalahan saat menghapus:', error);
      }
    }
  };

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold text-[#3B91FF] mb-6">
        Jadwal Petugas
      </h1>

      <div className="bg-[#EAEFF5] rounded-3xl p-6 shadow-sm border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-[#0D2840]">Daftar Petugas Piket</h2>
        </div>

        <div className="bg-white rounded-2xl overflow-hidden shadow-xs border border-gray-200">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#93C5FD] text-[#0D2840] text-xs font-bold uppercase tracking-wider border-b border-blue-200">
                <th className="px-4 py-3.5 text-center w-12">No</th>
                <th className="px-4 py-3.5">Hari</th>
                <th className="px-4 py-3.5">Nama Petugas</th>
                <th className="px-4 py-3.5">Jam Piket</th>
                <th className="px-4 py-3.5 text-center w-16">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs text-gray-700">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-gray-400">
                    Memuat data jadwal dari database...
                  </td>
                </tr>
              ) : errorMsg ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-red-500">
                    {errorMsg}
                  </td>
                </tr>
              ) : dataJadwal.length > 0 ? (
                dataJadwal.map((item: any, index: number) => {
                  const jamMulai = item.Jam_Mulai ? item.Jam_Mulai.slice(0, 5) : '';
                  const jamSelesai = item.Jam_Selesai ? item.Jam_Selesai.slice(0, 5) : '';
                  const jamPiket = jamMulai && jamSelesai ? `${jamMulai} - ${jamSelesai}` : '-';

                  return (
                    <tr key={item.id} className="hover:bg-gray-50 transition">
                      <td className="px-4 py-3 text-center font-medium">{index + 1}</td>
                      <td className="px-4 py-3 font-semibold">{item.Hari || '-'}</td>
                      <td className="px-4 py-3">
                        {item.Nama || '-'}{' '}
                        {item.Jabatan && (
                          <span className="text-gray-400 font-normal">({item.Jabatan})</span>
                        )}
                      </td>
                      <td className="px-4 py-3">{jamPiket}</td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="text-red-500 hover:text-red-700 transition p-1"
                          title="Hapus"
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-gray-400">
                    Belum ada data jadwal petugas.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}