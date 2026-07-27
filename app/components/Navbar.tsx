'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false); // State untuk buka/tutup menu di HP

  const hideNavbar = 
    pathname === '/adm/dashboard' || 
    pathname === '/adm/jadwal' || 
    pathname === '/adm/input' || 
    pathname === '/login';

  if (hideNavbar) return null;

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-sky-900 sticky top-0 z-50 flex flex-col md:flex-row items-center justify-between py-3 px-6 md:px-8 text-white shadow-md">
      {/* Bagian Atas di HP: Logo & Tombol Hamburger */}
      <div className="w-full flex items-center justify-between md:w-auto">
        <div className="flex items-center gap-2.5">
          <div className="relative w-7 h-7">
            <Image src="/images/pmi.png" alt="Logo PMI" fill className="object-contain" />
          </div>
          <div className="flex items-center text-lg font-bold tracking-tight">
            <span className="text-white">gridas</span>
            <span className="text-red-500">Care</span>
          </div>
        </div>

        {/* Tombol Hamburger khusus HP */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-lg text-white hover:bg-sky-800 focus:outline-none cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Menu Navigasi (Tampil berjejer di desktop, dropdown turun ke bawah saat tombol hamburger diklik di HP) */}
      <div
        className={`${
          isOpen ? 'flex' : 'hidden'
        } md:flex flex-col md:flex-row items-center w-full md:w-auto gap-4 md:gap-5 text-xs font-medium mt-4 md:mt-0 pt-3 md:pt-0 border-t border-sky-800 md:border-t-0`}
      >
        <Link 
          href="/" 
          onClick={() => setIsOpen(false)}
          className={`transition py-1 md:py-0 ${isActive('/') ? 'text-blue-400 font-semibold' : 'text-white hover:text-blue-300'}`}
        >
          Beranda
        </Link>
        <Link 
          href="/Jadwal_petugas" 
          onClick={() => setIsOpen(false)}
          className={`transition py-1 md:py-0 ${isActive('/Jadwal_petugas') ? 'text-blue-400 font-semibold' : 'text-white hover:text-blue-300'}`}
        >
          Jadwal PMR
        </Link>
        <Link 
          href="/user_siswasakit" 
          onClick={() => setIsOpen(false)}
          className={`transition py-1 md:py-0 ${isActive('/user_siswasakit') ? 'text-blue-400 font-semibold' : 'text-white hover:text-blue-300'}`}
        >
          Siswa Sakit
        </Link>
        <Link 
          href="/pertolongan" 
          onClick={() => setIsOpen(false)}
          className={`transition py-1 md:py-0 ${isActive('/pertolongan') ? 'text-blue-400 font-semibold' : 'text-white hover:text-blue-300'}`}
        >
          PP
        </Link>
        <Link 
          href="/obat2" 
          onClick={() => setIsOpen(false)}
          className={`transition py-1 md:py-0 ${isActive('/obat2') ? 'text-blue-400 font-semibold' : 'text-white hover:text-blue-300'}`}
        >
          Obat-Obatan
        </Link>

        {/* Tombol Admin versi mobile (muncul di dalam menu dropdown HP) */}
        <Link 
          href="/login" 
          onClick={() => setIsOpen(false)}
          className="md:hidden mt-2 bg-white text-blue-400 px-4 py-1.5 rounded-full font-bold text-xs hover:bg-gray-100 transition shadow"
        >
          Admin
        </Link>
      </div>

      {/* Tombol Admin khusus Desktop (posisi di kanan luar menu) */}
      <div className="hidden md:block ml-4">
        <Link 
          href="/login" 
          className="bg-white text-blue-400 px-4 py-1.5 rounded-full font-bold text-xs hover:bg-gray-100 transition shadow"
        >
          Admin
        </Link>
      </div>
    </nav>
  );
}