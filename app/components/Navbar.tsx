'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const hideNavbar = 
    pathname === '/adm/dashboard' || 
    pathname === '/adm/jadwal' || 
    pathname === '/adm/input' || 
    pathname === '/login';

  if (hideNavbar) return null;

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-sky-900 sticky top-0 z-50 flex items-center py-3 px-8 text-white shadow-md">
      {/* Logo & Nama Instansi (Dikecilkan) */}
      <div className="flex items-center gap-2.5">
        <div className="relative w-7 h-7">
          <Image src="/images/pmi.png" alt="Logo PMI" fill className="object-contain" />
        </div>
        <div className="flex items-center text-lg font-bold tracking-tight">
          <span className="text-white">gridas</span>
          <span className="text-red-500">Care</span>
        </div>
      </div>

      {/* Menu Navigasi (Teks diperkecil ke text-xs dan gap dirapatkan) */}
      <div className="ml-auto flex items-center gap-5 text-xs font-medium mr-4">
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

      {/* Tombol Admin (Padding diperkecil agar lebih ramping) */}
      <Link 
        href="/login" 
        className="bg-white text-blue-400 px-4 py-1.5 rounded-full font-bold text-xs hover:bg-gray-100 transition shadow"
      >
        Admin
      </Link>
    </nav>
  );
}