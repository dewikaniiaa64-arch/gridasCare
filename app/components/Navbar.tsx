"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const hideNavbar =
    pathname === "/adm/dashboard" ||
    pathname === "/adm/jadwal" ||
    pathname === "/adm/input" ||
    pathname === "/login";

  if (hideNavbar) return null;

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 left-0 w-full z-[99999] bg-sky-900 shadow-md">
      <nav className="flex items-center justify-between px-4 md:px-10 py-3 text-white w-full relative">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <div className="relative w-7 h-7">
            <Image
              src="/images/pmi.png"
              alt="Logo PMI"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="flex items-center text-lg font-bold tracking-tight">
            <span className="text-white">gridas</span>
            <span className="text-red-500">Care</span>
          </div>
        </Link>

        {/* Menu Desktop */}
        <div className="hidden md:flex items-center gap-4 text-xs font-medium ml-auto mr-8">
          <Link
            href="/"
            className={
              isActive("/") ? "text-blue-400 font-semibold" : "text-white"
            }
          >
            Beranda
          </Link>
          <Link
            href="/Jadwal_petugas"
            className={
              isActive("/Jadwal_petugas")
                ? "text-blue-400 font-semibold"
                : "text-white"
            }
          >
            Jadwal PMR
          </Link>
          <Link
            href="/user_siswasakit"
            className={
              isActive("/user_siswasakit")
                ? "text-blue-400 font-semibold"
                : "text-white"
            }
          >
            Siswa Sakit
          </Link>
          <Link
            href="/pertolongan"
            className={
              isActive("/pertolongan")
                ? "text-blue-400 font-semibold"
                : "text-white"
            }
          >
            PP
          </Link>
          <Link
            href="/obat2"
            className={
              isActive("/obat2") ? "text-blue-400 font-semibold" : "text-white"
            }
          >
            Obat-Obatan
          </Link>
        </div>

        {/* Tombol Admin & Hamburger Mobile */}
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="hidden md:block bg-white text-blue-400 px-4 py-1.5 rounded-full font-bold text-xs"
          >
            Admin
          </Link>

          {/* Tombol Garis Tiga (Mobile) */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setIsOpen((prev) => !prev);
            }}
            className="md:hidden p-2.5 bg-sky-800 text-white rounded-lg outline-none cursor-pointer relative z-[100000]"
            aria-label="Toggle Menu"
          >
            <svg
              className="h-6 w-6 pointer-events-none"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Menu Overlay Mobile */}
      {isOpen && (
        <div className="md:hidden bg-sky-950 text-white flex flex-col p-5 gap-3 border-t border-sky-800 text-sm font-medium w-full">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="py-2 border-b border-sky-800"
          >
            Beranda
          </Link>
          <Link
            href="/Jadwal_petugas"
            onClick={() => setIsOpen(false)}
            className="py-2 border-b border-sky-800"
          >
            Jadwal PMR
          </Link>
          <Link
            href="/user_siswasakit"
            onClick={() => setIsOpen(false)}
            className="py-2 border-b border-sky-800"
          >
            Siswa Sakit
          </Link>
          <Link
            href="/pertolongan"
            onClick={() => setIsOpen(false)}
            className="py-2 border-b border-sky-800"
          >
            PP
          </Link>
          <Link
            href="/obat2"
            onClick={() => setIsOpen(false)}
            className="py-2 border-b border-sky-800"
          >
            Obat-Obatan
          </Link>
          <Link
            href="/login"
            onClick={() => setIsOpen(false)}
            className="mt-2 w-full text-center bg-white text-blue-400 py-2 rounded-full font-bold"
          >
            Admin
          </Link>
        </div>
      )}
    </header>
  );
}
