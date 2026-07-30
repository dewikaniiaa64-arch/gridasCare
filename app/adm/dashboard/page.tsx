'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

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

  // --- State Modal Export Laporan ---
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportFormat, setExportFormat] = useState<'pdf' | 'excel'>('pdf');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // --- State Modal Hapus Data ---
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedDeleteItem, setSelectedDeleteItem] = useState<{ id: number; documentId?: string } | null>(null);

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

  // Buka Modal Konfirmasi Hapus
  const openDeleteModal = (id: number, documentId?: string) => {
    setSelectedDeleteItem({ id, documentId });
    setShowDeleteModal(true);
  };

  // Eksekusi Hapus Data dari Strapi
  const confirmDelete = async () => {
    if (!selectedDeleteItem) return;

    try {
      const targetId = selectedDeleteItem.documentId || selectedDeleteItem.id;
      const res = await fetch(`${STRAPI_URL}/api/siswa-sakits/${targetId}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Gagal menghapus data');

      fetchDataSiswa();
    } catch (error) {
      console.error('Error deleting:', error);
      alert('Terjadi kesalahan saat menghapus data.');
    } finally {
      setShowDeleteModal(false);
      setSelectedDeleteItem(null);
    }
  };

  // Eksekusi Export Laporan
  const handleExportSubmit = () => {
    // Logika pengunduhan/proses export kamu di sini
    console.log('Exporting...', {
      format: exportFormat,
      startDate,
      endDate,
    });
    alert(`Mengeksport laporan format ${exportFormat.toUpperCase()}...`);
    setShowExportModal(false);
  };

  const filteredData = dataSiswa.filter(
    (item) =>
      item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tanggal.includes(searchQuery) ||
      item.kelas.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-10 w-full bg-white min-h-screen relative">
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

          <button
            onClick={() => setShowExportModal(true)}
            className="bg-[#0D2840] text-white px-5 py-2 rounded-xl font-bold text-xs flex items-center gap-2 hover:bg-slate-800 transition shadow cursor-pointer"
          >
            <svg width="20" height="20" viewBox="0 0 40 35" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M31.7998 11.667C32.9199 11.667 33.4804 11.6668 33.9082 11.8848C34.2844 12.0765 34.5905 12.3825 34.7822 12.7588C35.0001 13.1865 35 13.7466 35 14.8662V25.9668C35 27.0864 35 27.6465 34.7822 28.0742C34.5905 28.4504 34.2844 28.7565 33.9082 28.9482C33.4804 29.1662 32.9199 29.167 31.7998 29.167H8.2002C7.08009 29.167 6.51962 29.1662 6.0918 28.9482C5.71563 28.7565 5.40946 28.4504 5.21777 28.0742C5.00001 27.6465 5 27.0864 5 25.9668V11.667H31.7998ZM17.499 22.0039L13.9912 18.9355L13.333 19.6875L12.6748 20.4404L16.8408 24.0859L17.5 24.6621L18.1582 24.0859L26.4912 16.7949L25.1748 15.2891L17.499 22.0039Z" fill="white" />
              <path d="M5 11.2917C5 9.40605 5 8.46324 5.58579 7.87745C6.17157 7.29166 7.11438 7.29166 9 7.29166H15.1637C15.9069 7.29166 16.2785 7.29166 16.6187 7.41946C16.9588 7.54725 17.2384 7.79195 17.7977 8.28136L21.6667 11.6667H5V11.2917Z" fill="white" />
            </svg>
            Export Laporan
          </button>
        </div>

        {/* Tabel Desktop */}
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
                        onClick={() => openDeleteModal(item.id, item.documentId)}
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

        {/* Tampilan Mobile */}
        <div className="lg:hidden space-y-4 mt-5">
          {loading ? (
            <div className="text-center py-6">Memuat data...</div>
          ) : filteredData.length > 0 ? (
            filteredData.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl shadow border border-gray-200 p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">{item.nama}</h2>
                    <p className="text-blue-500 text-sm">{item.kelas}</p>
                  </div>
                  <button
                    onClick={() => openDeleteModal(item.id, item.documentId)}
                    className="text-red-500 text-xl cursor-pointer"
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

      {/* ==================== POP UP EXPORT LAPORAN ==================== */}
      {showExportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border border-gray-200">
            {/* Header Modal */}
            <div className="bg-[#0B3A60] px-6 py-4 flex justify-between items-center text-white">
              <div className="flex items-center gap-2 font-bold text-lg">
                <div className="relative w-6 h-6 shrink-0">
                  <Image
                    src="/images/pmi.png"
                    alt="Icon PMI"
                    fill
                    className="object-contain"
                  />
                </div>
                <span>gridas<span className="text-red-500">Care</span></span>
              </div>
              <button
                onClick={() => setShowExportModal(false)}
                className="flex items-center gap-1 text-sm font-semibold hover:text-gray-300 transition cursor-pointer"
              >
                Close ✕
              </button>
            </div>

            {/* Body Modal */}
            <div className="p-6">
              <h3 className="font-bold text-black text-lg mb-4">Pilih Format Export Laporan</h3>

              {/* Opsi Pilihan PDF / Excel */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div
                  onClick={() => setExportFormat('pdf')}
                  className={`border-2 rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer transition ${exportFormat === 'pdf' ? 'border-blue-600 bg-blue-50/30' : 'border-gray-800 hover:border-blue-400'
                    }`}
                >
                  <div className="w-12 h-12 flex items-center justify-center mb-2">
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M9.57031 0H24L36 12V34.7926C36 37.6712 33.5088 40 30.4403 40H9.57031C6.49114 40 4 37.6712 4 34.7926V5.20738C3.99995 2.32883 6.49108 0 9.57031 0Z" fill="#1447E6" />
                      <path d="M24 8.16406V0L36 12H28.0171C24.4248 12 24 9.47141 24 8.16406Z" fill="white" fill-opacity="0.3" />
                      <g clip-path="url(#clip0_867_4725)">
                        <path d="M26.8903 25.8319C25.8147 24.6816 22.8775 25.1503 22.1743 25.2355C21.1401 24.2129 20.4369 22.9774 20.1887 22.5514C20.561 21.4011 20.8091 20.2508 20.8505 19.0154C20.8505 17.9502 20.4369 16.8 19.2785 16.8C18.8648 16.8 18.4925 17.0555 18.2856 17.3964C17.7892 18.2911 17.996 20.0805 18.782 21.9125C18.327 23.2331 17.9133 24.5112 16.755 26.7693C15.5553 27.2804 13.0318 28.4734 12.825 29.7515C12.7422 30.1349 12.8663 30.5185 13.1559 30.8166C13.4455 31.0722 13.8178 31.2 14.1901 31.2C15.7207 31.2 17.21 29.0273 18.2442 27.1952C19.113 26.897 20.4782 26.471 21.8433 26.2153C23.4567 27.6639 24.8632 27.8768 25.6079 27.8768C26.6007 27.8768 26.9731 27.4508 27.0971 27.0673C27.3039 26.6414 27.1798 26.1727 26.8903 25.8319ZM25.856 26.5562C25.8147 26.8545 25.4425 27.1526 24.7805 26.9822C23.9945 26.7693 23.2912 26.3858 22.6707 25.8745C23.2085 25.7892 24.4081 25.6615 25.2769 25.8319C25.6079 25.9171 25.9388 26.1301 25.856 26.5562ZM18.9476 17.7798C19.0303 17.652 19.1544 17.5668 19.2785 17.5668C19.6508 17.5668 19.7335 18.0354 19.7335 18.4189C19.6921 19.3137 19.5266 20.2083 19.2371 21.0604C18.6165 19.3562 18.7407 18.1632 18.9476 17.7798ZM18.8648 26.045C19.1958 25.3633 19.6509 24.1703 19.8163 23.659C20.1886 24.298 20.8091 25.065 21.1401 25.4058C21.1401 25.4485 19.8577 25.704 18.8648 26.045ZM16.4241 27.7491C15.4726 29.368 14.4797 30.3905 13.9419 30.3905C13.8592 30.3905 13.7764 30.3479 13.6937 30.3053C13.5695 30.22 13.5282 30.0923 13.5695 29.9219C13.6937 29.3255 14.7693 28.516 16.4241 27.7491Z" fill="white" />
                      </g>
                      <defs>
                        <clipPath id="clip0_867_4725">
                          <rect width="16" height="16" fill="white" transform="translate(12 16)" />
                        </clipPath>
                      </defs>
                    </svg>

                  </div>
                  <span className="font-bold text-sm text-black text-center">Cetak Laporan Rapi</span>
                  <span className="text-xs text-gray-500">(PDF)</span>
                </div>

                <div
                  onClick={() => setExportFormat('excel')}
                  className={`border-2 rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer transition ${exportFormat === 'excel' ? 'border-green-600 bg-green-50/30' : 'border-gray-800 hover:border-green-400'
                    }`}
                >
                  <div className="w-12 h-12 flex items-center justify-center mb-2">
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M9.57031 0H24L36 12V34.7926C36 37.6712 33.5088 40 30.4403 40H9.57031C6.49114 40 4 37.6712 4 34.7926V5.20738C3.99995 2.32883 6.49108 0 9.57031 0Z" fill="#079455" />
                      <path d="M24 8.16406V0L36 12H28.0171C24.4248 12 24 9.47141 24 8.16406Z" fill="white" fill-opacity="0.3" />
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M17.5383 18.2857C16.1396 18.2857 15.5229 18.4089 14.897 18.7437C14.3398 19.0417 13.899 19.4824 13.601 20.0397C13.2663 20.6656 13.1431 21.2822 13.1431 22.681V25.3191C13.1431 26.7178 13.2663 27.3344 13.601 27.9603C13.899 28.5176 14.3398 28.9583 14.897 29.2564C15.5229 29.5911 16.1396 29.7143 17.5383 29.7143H22.4621C23.8608 29.7143 24.4775 29.5911 25.1034 29.2564C25.6606 28.9583 26.1014 28.5176 26.3994 27.9603C26.7341 27.3344 26.8574 26.7178 26.8574 25.3191V22.681C26.8574 21.2822 26.7341 20.6656 26.3994 20.0397C26.1014 19.4824 25.6606 19.0417 25.1034 18.7437C24.4775 18.4089 23.8608 18.2857 22.4621 18.2857H17.5383ZM15.436 19.7514C15.8136 19.5495 16.204 19.4286 17.5383 19.4286H19.4288V21.7143H14.3171C14.3653 21.1149 14.4671 20.8436 14.6088 20.5787C14.8003 20.2206 15.0779 19.943 15.436 19.7514ZM19.4288 22.8571H14.2859V25.1429H19.4288V22.8571ZM20.5716 25.1429V22.8571H25.7145V25.1429H20.5716ZM19.4288 26.2857H14.3171C14.3653 26.8851 14.4671 27.1564 14.6088 27.4213C14.8003 27.7794 15.0779 28.0571 15.436 28.2486C15.8136 28.4505 16.204 28.5714 17.5383 28.5714H19.4288V26.2857ZM20.5716 28.5714V26.2857H25.6833C25.6351 26.8851 25.5333 27.1564 25.3916 27.4213C25.2001 27.7794 24.9225 28.0571 24.5644 28.2486C24.1868 28.4505 23.7964 28.5714 22.4621 28.5714H20.5716ZM20.5716 21.7143V19.4286H22.4621C23.7964 19.4286 24.1868 19.5495 24.5644 19.7514C24.9225 19.943 25.2001 20.2206 25.3916 20.5787C25.5333 20.8436 25.6351 21.1149 25.6833 21.7143H20.5716Z" fill="white" />
                    </svg>

                  </div>
                  <span className="font-bold text-sm text-black text-center">Data Mentah</span>
                  <span className="text-xs text-gray-500">(Excel .Xlsx)</span>
                </div>
              </div>

              {/* Rentang Tanggal */}
              <h4 className="font-bold text-black text-md mb-2">
                Rentang Tanggal <span className="font-normal text-gray-500 text-sm">(opsional)</span>
              </h4>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div>
                  <label className="block text-xs font-semibold text-black mb-1">Mulai</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full border border-gray-800 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 text-black"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-black mb-1">Sampai</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full border border-gray-800 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 text-black"
                  />
                </div>
              </div>

              {/* Tombol Aksi Export */}
              <div className="flex justify-between items-center gap-4">
                <button
                  onClick={handleExportSubmit}
                  className="bg-[#0B2545] text-white px-8 py-2.5 rounded-xl font-bold text-sm hover:bg-slate-800 transition cursor-pointer"
                >
                  Export Sekarang
                </button>
                <button
                  onClick={() => setShowExportModal(false)}
                  className="border border-gray-800 text-gray-800 px-8 py-2.5 rounded-xl font-bold text-sm hover:bg-gray-100 transition cursor-pointer"
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================== POP UP KONFIRMASI HAPUS ==================== */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white w-full max-w-md rounded-2xl p-8 border border-gray-300 shadow-2xl text-center">
            <h3 className="text-lg sm:text-xl font-bold text-black mb-8">
              Apakah kamu yakin ingin menghapusnya?
            </h3>

            <div className="flex justify-center items-center gap-6">
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white font-bold px-10 py-2.5 rounded-lg border border-red-600 hover:bg-red-600 transition cursor-pointer"
              >
                Ya
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-white text-black font-bold px-10 py-2.5 rounded-lg border border-gray-800 hover:bg-gray-100 transition cursor-pointer"
              >
                Tidak
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}