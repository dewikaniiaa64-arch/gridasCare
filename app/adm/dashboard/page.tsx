'use client';

import React, { useState } from 'react';

export default function SiswaSakitPage() {
  const [dataSiswa, setDataSiswa] = useState([
    { id: 1, nama: 'Zhang Linghe', kelas: 'XI-PPLG 5', keluhan: 'Pusing', tanggal: '03/02/2016', penanganan: 'Minum Obat' },
    { id: 2, nama: 'Lu Xixaou', kelas: 'XI-MIPA 1', keluhan: 'Sakit Perut', tanggal: '04/02/2017', penanganan: 'Minum Promag' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const confirmDelete = (id: number) => {
    setSelectedId(id);
    setShowConfirmModal(true);
  };

  const handleDeleteYes = () => {
    if (selectedId !== null) {
      setDataSiswa(dataSiswa.filter((item) => item.id !== selectedId));
    }
    setShowConfirmModal(false);
    setSelectedId(null);
  };

  const handleDeleteNo = () => {
    setShowConfirmModal(false);
    setSelectedId(null);
  };

  const filteredData = dataSiswa.filter(
    (item) =>
      item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tanggal.includes(searchTerm)
  );

  return (
    <div className="p-10 bg-white min-h-full relative">
      <h1 className="text-3xl font-bold text-[#3b82f6] mb-8">
        Data Siswa Sakit
      </h1>

      <div className="bg-gray-100 p-6 rounded-2xl shadow-inner">
        {/* Baris Pencarian & Tombol Ekspor */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <div className="relative w-full sm:w-72">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_714_2482)">
                  <path d="M1.47205 13.357C1.93756 14.4523 2.61426 15.4453 3.46352 16.2791C4.31277 17.1129 5.31794 17.7713 6.42165 18.2167C7.52535 18.6621 8.70596 18.8857 9.89609 18.8748C11.0862 18.8639 12.2625 18.6187 13.3579 18.1532C14.4532 17.6876 15.4462 17.0109 16.28 16.1617C17.1138 15.3124 17.7722 14.3072 18.2176 13.2035C18.663 12.0998 18.8866 10.9192 18.8757 9.7291C18.8648 8.53898 18.6195 7.36266 18.154 6.2673C17.6885 5.17194 17.0118 4.179 16.1626 3.34517C15.3133 2.51133 14.3081 1.85294 13.2044 1.40757C12.1007 0.962206 10.9201 0.738591 9.72999 0.749495C8.53987 0.7604 7.36355 1.00561 6.26819 1.47113C5.17284 1.93664 4.1799 2.61334 3.34607 3.4626C2.51223 4.31186 1.85384 5.31703 1.40848 6.42073C0.963115 7.52444 0.739503 8.70506 0.750411 9.89518C0.761319 11.0853 1.00653 12.2616 1.47205 13.357Z" stroke="black" stroke-opacity="0.7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M16.221 16.22L23.25 23.25" stroke="black" stroke-opacity="0.7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </g>
                <defs>
                  <clipPath id="clip0_714_2482">
                    <rect width="24" height="24" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
            </span>
            <input
              type="text"
              placeholder="Cari siswa/Tanggal"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            onClick={() => alert('Laporan berhasil diexport!')}
            className="flex items-center gap-2 bg-blue-950 hover:bg-gray-800 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow transition"
          >
            <svg width="24" height="24" viewBox="0 0 40 35" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M31.7998 11.667C32.9199 11.667 33.4804 11.6668 33.9082 11.8848C34.2844 12.0765 34.5905 12.3825 34.7822 12.7588C35.0001 13.1865 35 13.7466 35 14.8662V25.9668C35 27.0864 35 27.6465 34.7822 28.0742C34.5905 28.4504 34.2844 28.7565 33.9082 28.9482C33.4804 29.1662 32.9199 29.167 31.7998 29.167H8.2002C7.08009 29.167 6.51962 29.1662 6.0918 28.9482C5.71563 28.7565 5.40946 28.4504 5.21777 28.0742C5.00001 27.6465 5 27.0864 5 25.9668V11.667H31.7998ZM17.499 22.0039L13.9912 18.9355L13.333 19.6875L12.6748 20.4404L16.8408 24.0859L17.5 24.6621L18.1582 24.0859L26.4912 16.7949L25.1748 15.2891L17.499 22.0039Z" fill="white"/>
              <path d="M5 11.2917C5 9.40605 5 8.46324 5.58579 7.87746C6.17157 7.29167 7.11438 7.29167 9 7.29167H15.1637C15.9069 7.29167 16.2785 7.29167 16.6187 7.41947C16.9588 7.54726 17.2384 7.79196 17.7977 8.28136L21.6667 11.6667H5V11.2917Z" fill="white"/>
            </svg>
            Export Laporan
          </button>
        </div>

        {/* Tabel Data */}
        <div className="bg-white rounded-xl shadow overflow-hidden border border-gray-200">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#bfdbfe] text-gray-800 text-sm font-bold border-b border-gray-200">
                <th className="py-3 px-4 text-center w-16">No</th>
                <th className="py-3 px-4">Nama</th>
                <th className="py-3 px-4">Kelas</th>
                <th className="py-3 px-4">Keluhan</th>
                <th className="py-3 px-4">Tanggal</th>
                <th className="py-3 px-4">Penanganan</th>
                <th className="py-3 px-4 text-center w-20">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
              {filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4 text-center">{index + 1}</td>
                    <td className="py-3 px-4 font-medium">{item.nama}</td>
                    <td className="py-3 px-4">{item.kelas}</td>
                    <td className="py-3 px-4">{item.keluhan}</td>
                    <td className="py-3 px-4">{item.tanggal}</td>
                    <td className="py-3 px-4">{item.penanganan}</td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => confirmDelete(item.id)}
                        className="text-red-500 hover:text-red-700 p-1 rounded transition"
                        title="Hapus"
                      >
                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M19.2501 8.25C18.2376 8.25 17.4172 9.07064 17.4171 10.083V13.25C17.4171 16.0783 17.4167 17.4924 16.5381 18.3711C15.6595 19.2497 14.2453 19.25 11.4171 19.25H10.5831C7.75486 19.25 6.34062 19.2497 5.46198 18.3711C4.58346 17.4924 4.58307 16.0783 4.58307 13.25V10.083C4.58289 9.07064 3.76247 8.25 2.75006 8.25V5.5H19.2501V8.25ZM8.70807 9.08301C8.15604 9.08318 7.70824 9.53098 7.70807 10.083V14.666C7.70807 15.2182 8.15593 15.6658 8.70807 15.666C9.26035 15.666 9.70807 15.2183 9.70807 14.666V10.083C9.70789 9.53087 9.26024 9.08301 8.70807 9.08301ZM13.2911 9.08301C12.7392 9.08336 12.2913 9.53109 12.2911 10.083V14.666C12.2911 15.2181 12.7391 15.6657 13.2911 15.666C13.8434 15.666 14.2911 15.2183 14.2911 14.666V10.083C14.2909 9.53087 13.8433 9.08301 13.2911 9.08301Z" fill="#C10A0A"/>
                          <path d="M9.22912 3.08971C9.33357 2.99225 9.56374 2.90613 9.88392 2.84471C10.2041 2.78329 10.5964 2.75 11 2.75C11.4036 2.75 11.7959 2.78329 12.116 2.84471C12.4362 2.90613 12.6664 2.99225 12.7708 3.08971" stroke="#C10A0A" stroke-width="2" stroke-linecap="round"/>
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-6 text-center text-gray-400">
                    Tidak ada data yang ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pop-up Modal Konfirmasi Hapus disamakan persis dengan Figma */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl shadow-2xl px-10 py-12 w-full max-w-lg text-center border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-10 tracking-tight">
              Apakah kamu yakin ingin menghapusnya?
            </h2>
            <div className="flex justify-center gap-6">
              <button
                onClick={handleDeleteYes}
                className="bg-[#FF3B30] hover:bg-red-600 text-white font-bold px-14 py-3 rounded-xl shadow transition"
              >
                Ya
              </button>
              <button
                onClick={handleDeleteNo}
                className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-900 font-bold px-14 py-3 rounded-xl shadow-xs transition"
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