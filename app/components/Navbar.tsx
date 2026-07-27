'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const hideNavbar =
    pathname === '/adm/dashboard' ||
    pathname === '/adm/jadwal' ||
    pathname === '/adm/input' ||
    pathname === '/login';

  if (hideNavbar) return null;

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-sky-900 sticky top-0 z-50 px-6 md:px-10 py-3 text-white shadow-md w-full">
      {/* Kontainer Utama */}
      <div className="flex items-center w-full">

        {/* 1. Logo & Nama Instansi (Di Paling Kiri) */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="relative w-7 h-7">
            <Image src="/images/pmi.png" alt="Logo PMI" fill className="object-contain" />
          </div>
          <div className="flex items-center text-lg font-bold tracking-tight">
            <span className="text-white">gridas</span>
            <span className="text-red-500">Care</span>
          </div>
        </div>

        {/* 2. Menu Navigasi Desktop (Dipaksa ke kanan dengan ml-auto & gap lebih renggang) */}
        <div className="hidden md:flex items-center gap-8 text-xs font-medium ml-auto mr-8">
          <Link
            href="/"
            className={`transition ${isActive('/') ? 'text-blue-400 font-semibold' : 'text-white hover:text-blue-300'}`}
          >
            Beranda
          </Link>
          <Link
            href="/Jadwal_petugas"
            className={`transition ${isActive('/Jadwal_petugas') ? 'text-blue-400 font-semibold' : 'text-white hover:text-blue-300'}`}
          >
            Jadwal PMR
          </Link>
          <Link
            href="/user_siswasakit"
            className={`transition ${isActive('/user_siswasakit') ? 'text-blue-400 font-semibold' : 'text-white hover:text-blue-300'}`}
          >
            Siswa Sakit
          </Link>
          <Link
            href="/pertolongan"
            className={`transition ${isActive('/pertolongan') ? 'text-blue-400 font-semibold' : 'text-white hover:text-blue-300'}`}
          >
            PP
          </Link>
          <Link
            href="/obat2"
            className={`transition ${isActive('/obat2') ? 'text-blue-400 font-semibold' : 'text-white hover:text-blue-300'}`}
          >
            Obat-Obatan
          </Link>
        </div>

        {/* 3. Tombol Admin di Paling Kanan */}
        <div className="flex items-center gap-3 shrink-0 md:ml-0 ml-auto">
          <Link
            href="/login"
            className="hidden md:block bg-white text-blue-400 px-4 py-1.5 rounded-full font-bold text-xs hover:bg-gray-100 transition shadow"
          >
            Admin
          </Link>

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

      </div>

      {/* Menu Dropdown khusus Tampilan HP (Mobile) */}
      {isOpen && (
        <div className="md:hidden flex flex-col gap-3 mt-4 pt-3 border-t border-sky-800 text-xs font-medium w-full">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className={`transition py-1 ${isActive('/') ? 'text-blue-400 font-semibold' : 'text-white hover:text-blue-300'}`}
          >
            Beranda
          </Link>
          <Link
            href="/Jadwal_petugas"
            onClick={() => setIsOpen(false)}
            className={`transition py-1 ${isActive('/Jadwal_petugas') ? 'text-blue-400 font-semibold' : 'text-white hover:text-blue-300'}`}
          >
            Jadwal PMR
          </Link>
          <Link
            href="/user_siswasakit"
            onClick={() => setIsOpen(false)}
            className={`transition py-1 ${isActive('/user_siswasakit') ? 'text-blue-400 font-semibold' : 'text-white hover:text-blue-300'}`}
          >
            Siswa Sakit
          </Link>
          <Link
            href="/pertolongan"
            onClick={() => setIsOpen(false)}
            className={`transition py-1 ${isActive('/pertolongan') ? 'text-blue-400 font-semibold' : 'text-white hover:text-blue-300'}`}
          >
            PP
          </Link>
          <Link
            href="/obat2"
            onClick={() => setIsOpen(false)}
            className={`transition py-1 ${isActive('/obat2') ? 'text-blue-400 font-semibold' : 'text-white hover:text-blue-300'}`}
          >
            Obat-Obatan
          </Link>
          <Link
            href="/login"
            onClick={() => setIsOpen(false)}
            className="w-fit mt-1 bg-white text-blue-400 px-4 py-1.5 rounded-full font-bold text-xs hover:bg-gray-100 transition shadow"
          >
            Admin
          </Link>
        </div>
      )}
    </nav>
  );
}