'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const getLinkClass = (path: string) => {
    return pathname === path 
      ? "text-[#0A405A] font-bold" // Warna biru saat aktif
      : "text-white hover:text-gray-200"; // Warna putih saat tidak aktif
  };

  return (
    <nav className="bg-[#79A0B4] flex justify-between items-center py-4 px-10 text-white">
      {/* Bagian Kiri: Logo */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 border-2 border-red-500 rounded-full flex items-center justify-center">
          <span className="text-red-500 font-bold text-xl leading-none">+</span>
        </div>
        <div className="text-2xl font-bold flex">
          <span>gridas</span><span className="text-[#FF4D4D]">Care</span>
        </div>
      </div>

      {/* Bagian Kanan: Menu Tanpa Kotak */}
      <div className="flex items-center gap-6 font-medium text-sm">
        <Link href="/" className={getLinkClass("/")}>
          Beranda
        </Link>
        <Link href="/Jadwal_petugas" className={getLinkClass("/Jadwal_petugass")}>
          Jadwal PMR
        </Link>
        <Link href="/user_siswasakit" className={getLinkClass("/user_siswasakit")}>
          Siswa Sakit
        </Link>
        <Link href="/pertolongan" className={getLinkClass("/pertolongan")}>
          PP
        </Link>
        <Link href="/obat2" className={getLinkClass("/obat2")}>
          Obat-obatan
        </Link>
      </div>

      <div className="ml-4 pl-4 border-l border-white/30">
        <Link href="/login" className="bg-white text-[#7799aa] px-4 py-2 rounded-full font-bold hover:bg-gray-100 transition">
          Admin
        </Link>
      </div>
    </nav>
  );
}