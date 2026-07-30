'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

      {/* Sidebar (Responsive: Bisa disembunyikan/muncul di HP, selalu tampil di md ke atas) */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-50 w-64 bg-[#4da3ff] p-6 flex flex-col justify-between shadow-md transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div>
          {/* Logo & Teks (Disembunyikan di versi mobile header atas agar tidak ganda) */}
          <div className="hidden md:flex flex-col items-center mb-10 pt-2">
            <div className="flex items-center gap-2">
              <div className="relative w-12 h-12">
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
            <div className="w-24 h-0.5 bg-white mt-2"></div>
          </div>

          <nav className="space-y-4 text-center mt-6 md:mt-0">
            <Link
              href="/adm/dashboard"
              onClick={() => setSidebarOpen(false)}
              className={`block py-3 px-6 rounded-full font-bold shadow-md transition ${
                pathname === '/adm/dashboard' 
                  ? 'bg-[#182232] text-white' 
                  : 'text-[#182232] hover:bg-white/20'
              }`}
            >
              Siswa Sakit
            </Link>
            <Link
              href="/adm/jadwal"
              onClick={() => setSidebarOpen(false)}
              className={`block py-3 px-6 rounded-full font-bold transition ${
                pathname === '/adm/jadwal' 
                  ? 'bg-[#182232] text-white' 
                  : 'text-[#182232] hover:bg-white/20'
              }`}
            >
              Jadwal Petugas
            </Link>
          </nav>
        </div>

        <div className="text-center pb-4 mt-8 md:mt-0">
          <button
            onClick={() => router.push('/login')}
            className="font-bold text-[#182232] hover:text-red-700 transition"
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
    </div>
  );
}