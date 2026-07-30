'use client';

import { useState, useEffect } from 'react';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

interface SiswaSakitItem {
  id: number;
  documentId?: string;
  nama: string;
  kelas: string;
  keluhan: string;
  tanggal: string;
  penanganan: string;
}

export default function AdminSiswaSakitPage() {
  const [dataSiswa, setDataSiswa] = useState<SiswaSakitItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchDataSiswa = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${STRAPI_URL}/api/siswa-sakits?populate=*`);
      if (!res.ok) return;

      const result = await res.json();
      const rawData = result.data || [];

      const formatted: SiswaSakitItem[] = rawData.map((item: any) => {
        const attr = item.attributes || item;
        return {
          id: item.id,
          documentId: item.documentId,
          nama: attr.Nama || attr.nama || '-',
          kelas: attr.Kelas || attr.kelas || '-',
          keluhan: attr.Keluhan || attr.keluhan || '-',
          tanggal: attr.Tanggal || attr.tanggal || '-',
          penanganan: attr.Penanganan || attr.penanganan || '-',
        };
      });

      setDataSiswa(formatted);
    } catch (error) {
      console.error('Gagal mengambil data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDataSiswa();
  }, []);

  const handleDelete = async (id: number, documentId?: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus data ini?')) return;

    try {
      const targetId = documentId || id;
      const res = await fetch(`${STRAPI_URL}/api/siswa-sakits/${targetId}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Gagal menghapus data');

      alert('Data berhasil dihapus');
      fetchDataSiswa();
    } catch (error) {
      console.error('Error deleting:', error);
      alert('Terjadi kesalahan saat menghapus data.');
    }
  };

  const filteredData = dataSiswa.filter(
    (item) =>
      item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tanggal.includes(searchQuery) ||
      item.kelas.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-10 w-full bg-white min-h-screen">
      <h1 className="text-3xl font-bold text-[#3B91FF] mb-6">
        Data Siswa Sakit
      </h1>

      <div className="bg-[#EAEFF5] rounded-3xl p-6 shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <div className="relative w-full sm:w-72">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Cari siswa/Tanggal"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white rounded-full border border-gray-300 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 text-black"
            />
          </div>

          <button className="bg-[#0D2840] text-white px-5 py-2 rounded-xl font-bold text-xs flex items-center gap-2 hover:bg-slate-800 transition shadow cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export Laporan
          </button>
        </div>

        <div className="hidden lg:block bg-white rounded-2xl overflow-hidden shadow-xs border border-gray-200">
  <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#93C5FD] text-[#0D2840] text-xs font-bold uppercase tracking-wider border-b border-blue-200">
                <th className="px-4 py-3.5 text-center w-12">No</th>
                <th className="px-4 py-3.5">Nama</th>
                <th className="px-4 py-3.5">Kelas</th>
                <th className="px-4 py-3.5">Keluhan</th>
                <th className="px-4 py-3.5">Tanggal</th>
                <th className="px-4 py-3.5">Penanganan</th>
                <th className="px-4 py-3.5 text-center w-16">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs text-gray-700">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-gray-400">
                    Memuat data dari Strapi...
                  </td>
                </tr>
              ) : filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                  <tr key={item.id} className="hover:bg-blue-50/50 transition">
                    <td className="px-4 py-3 text-center font-semibold text-gray-500">{index + 1}</td>
                    <td className="px-4 py-3 font-bold text-slate-900">{item.nama}</td>
                    <td className="px-4 py-3">{item.kelas}</td>
                    <td className="px-4 py-3">{item.keluhan}</td>
                    <td className="px-4 py-3">{item.tanggal}</td>
                    <td className="px-4 py-3">{item.penanganan}</td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => handleDelete(item.id, item.documentId)}
                        className="text-red-500 hover:text-red-700 transition cursor-pointer p-1"
                        title="Hapus Data"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-gray-400">
                    Belum ada data siswa sakit yang tercatat.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="lg:hidden space-y-4 mt-5">
  {loading ? (
    <div className="text-center py-6">
      Memuat data...
    </div>
  ) : filteredData.length > 0 ? (
    filteredData.map((item) => (
      <div
        key={item.id}
        className="bg-white rounded-2xl shadow border border-gray-200 p-4"
      >
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              {item.nama}
            </h2>

            <p className="text-blue-500 text-sm">
              {item.kelas}
            </p>
          </div>

          <button
            onClick={() => handleDelete(item.id, item.documentId)}
            className="text-red-500 text-xl"
          >
            🗑️
          </button>
        </div>

        <div className="mt-4 space-y-2 text-sm">
          <div>
            <p className="text-gray-400">Keluhan</p>
            <p>{item.keluhan}</p>
          </div>

          <div>
            <p className="text-gray-400">Tanggal</p>
            <p>{item.tanggal}</p>
          </div>

          <div>
            <p className="text-gray-400">Penanganan</p>
            <p>{item.penanganan}</p>
          </div>
        </div>
      </div>
    ))
  ) : (
    <div className="text-center py-6 text-gray-400">
      Belum ada data siswa sakit.
    </div>
  )}
</div>
      </div>
    </div>
  );
}