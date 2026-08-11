'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // State proteksi auth & modal
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // --- PROTEKSI HALAMAN (CLIENT-SIDE GUARD) ---
  useEffect(() => {
    // Fungsi membaca cookie sederhana
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(';').shift();
      return null;
    };

    const token = getCookie('admin_token');

    // Cek jika token tidak ada, bernilai 'undefined', atau 'null'
    if (!token || token === 'undefined' || token === 'null' || token.trim() === '') {
      // Tendang langsung ke halaman login (atau halaman utama /)
      router.replace('/');
    } else {
      setIsAuthorized(true);
    }
  }, [router]);

  // Fungsi penanganan logout sebenarnya
  const handleConfirmLogout = () => {
    // Hapus cookie admin_token
    document.cookie = 'admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';

    setShowLogoutModal(false);
    // Menggunakan path relatif '/' agar bisa berjalan di localhost maupun Vercel
    router.replace('/');
  };

  // Tampilkan screen kosong / loading sebelum status auth terverifikasi
  if (!isAuthorized) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-blue-400 text-white font-bold">
        Memeriksa Akses...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-blue-400 overflow-x-hidden">

      {/* Tombol Menu Hamburger khusus untuk Tampilan HP */}
      <div className="md:hidden flex items-center justify-between bg-[#4da3ff] px-6 py-4 shadow-md">
        <div className="flex items-center gap-2">
          <div className="relative w-8 h-8">
            <Image
              src="/images/pmi.png"
              alt="Logo Icon"
              fill
              className="object-contain"
              priority
            />
          </div>
          <span className="text-white font-extrabold text-xl tracking-wide">
            gridas<span className="text-red-500">Care</span>
          </span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-[#182232] font-bold p-2 focus:outline-none"
        >
          {sidebarOpen ? '✕ Tutup' : '☰ Menu'}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-50 w-64 bg-[#4da3ff] p-6 flex flex-col justify-between shadow-md transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div>
          {/* Logo & Teks */}
          <div className="hidden md:flex flex-col items-center mb-10 pt-2 w-full">
            <div className="flex items-center justify-center gap-2 w-full">
              <div className="relative w-12 h-12 shrink-0">
                <Image
                  src="/images/pmi.png"
                  alt="Logo Icon"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <span className="text-white font-extrabold text-2xl tracking-wide">
                gridas<span className="text-red-500">Care</span>
              </span>
            </div>

            {/* Garis dibuat terpusat menggunakan flex parent & justify-center */}
            <div className="w-28 h-0.5 bg-white mt-3 rounded-full"></div>
          </div>

          <nav className="space-y-4 text-center mt-6 md:mt-0">
            <Link
              href="/adm/dashboard"
              onClick={() => setSidebarOpen(false)}
              className={`block py-3 px-6 rounded-full font-bold transition ${pathname === '/adm/dashboard'
                ? 'bg-[#182232] text-white'
                : 'text-[#182232] hover:bg-white/20'
                }`}
            >
              Siswa Sakit
            </Link>
            <Link
              href="/adm/jadwal"
              onClick={() => setSidebarOpen(false)}
              className={`block py-3 px-6 rounded-full font-bold transition ${pathname === '/adm/jadwal'
                ? 'bg-[#182232] text-white'
                : 'text-[#182232] hover:bg-white/20'
                }`}
            >
              Jadwal Petugas
            </Link>
          </nav>
        </div>

        {/* Tombol Logout (Memicu munculnya pop-up modal) */}
        <div className="text-center pb-4 mt-8 md:mt-0">
          <button
            onClick={() => setShowLogoutModal(true)}
            className="font-bold text-[#182232] hover:text-red-700 transition cursor-pointer"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Backdrop gelap saat sidebar HP dibuka */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
        ></div>
      )}

      {/* Konten Utama */}
      <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto bg-white min-h-[calc(100vh-65px)] md:min-h-screen">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>

      {/* --- POP-UP MODAL KONFIRMASI LOGOUT --- */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl text-center border border-gray-100 transform transition-all">

            <h3 className="text-lg font-bold text-gray-800 mb-2">
              Konfirmasi Keluar
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              Apakah anda yakin ingin keluar?
            </p>

            {/* Pilihan Tombol */}
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 px-4 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-xl font-bold text-sm transition"
              >
                Batal
              </button>
              <button
                onClick={handleConfirmLogout}
                className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-sm transition shadow-md"
              >
                Ya, Keluar
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}