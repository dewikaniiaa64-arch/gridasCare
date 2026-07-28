'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col min-h-screen bg-[#333333] font-sans">
      {/* Wrapper Utama dibuat melebar penuh (w-full) agar proporsional */}
      <div className="flex-1 flex flex-col w-full mx-auto bg-white shadow-2xl">
        
        {/* Area Tengah: Sidebar (Kiri) & Konten (Kanan) */}
        <div className="flex flex-1 flex-row">
          
          {/* Sidebar Admin */}
          <aside className="w-64 bg-[#3B91FF] flex flex-col justify-between p-6 shrink-0">
            <div>
              {/* Logo / Brand */}
              <div className="flex items-center gap-2 mb-10">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <span className="text-[#FF3B30] font-black text-xl leading-none">+</span>
                </div>
                <span className="text-white font-black text-xl tracking-tight">
                  gridas<span className="text-[#0D2840]">Care</span>
                </span>
              </div>

              {/* Menu Navigasi */}
              <nav className="space-y-3">
                <Link
                  href="/adm/dashboard"
                  className={`w-full py-3 px-4 rounded-full text-left text-sm flex items-center gap-3 transition block font-bold ${
                    pathname === '/adm/dashboard'
                      ? 'bg-[#0D2840] text-white shadow-md'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  Siswa Sakit
                </Link>

                <Link
                  href="/adm/jadwal"
                  className={`w-full py-3 px-4 rounded-full text-left text-sm flex items-center gap-3 transition block font-bold ${
                    pathname === '/adm/jadwal'
                      ? 'bg-[#0D2840] text-white shadow-md'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  Jadwal Petugas
                </Link>
              </nav>
            </div>

            {/* Logout */}
            <div className="pt-6">
              <Link href="/login" className="text-[#0D2840] font-extrabold text-base hover:underline block">
                Logout
              </Link>
            </div>
          </aside>

          {/* Area Konten Dinamis */}
          <main className="flex-1 bg-white overflow-x-auto p-10">
            {children}
          </main>
        </div>

        {/* Footer Admin (Sekarang dijamin nempel rapi di bawah) */}
        <footer className="bg-[#064663] py-6 px-6 md:px-10 text-white flex flex-col md:flex-row justify-between items-center gap-6 mt-auto">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-4 text-center md:text-left">
            <div className="w-10 h-10 relative shrink-0">
              <Image src="/images/pmi.png" alt="Logo PMI" fill className="object-cover" />
            </div>
            <div>
              <h2 className="font-bold text-lg leading-tight">
                <span className="text-white">gridas</span>
                <span className="text-red-500">Care</span>
              </h2>
              <p className="text-xs text-white font-extrabold">Smkn 2 Sumedang</p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-2xl">
            <a href="tel:0261201531" className="hover:text-red-400 transition" aria-label="Telepon">
              📞
            </a>
            <a href="#" className="hover:text-red-400 transition" aria-label="Instagram">
              📷
            </a>
            <a href="#" className="hover:text-red-400 transition" aria-label="Email">
              ✉️
            </a>
          </div>
        </footer>

      </div>
    </div>
  );
}