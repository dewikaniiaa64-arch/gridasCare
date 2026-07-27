'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  

  return (
    <div className="flex h-screen bg-blue-400">
      {/* Sidebar */}
      <aside className="w-64 bg-[#4da3ff] p-6 flex flex-col justify-between shadow-md">
        <div>
          {/* Logo & Teks dengan Garis di Tengah Bawah Tulisan */}
          <div className="flex flex-col items-center mb-10 pt-2">
            <div className="flex items-center gap-2">
              {/* Gambar pmi.png */}
              <div className="relative w-12 h-12">
                <Image 
                  src="/images/pmi.png" 
                  alt="Logo Icon" 
                  fill 
                  className="object-contain"
                  priority
                />
              </div>
              {/* Teks GridasCare */}
              <span className="text-white font-extrabold text-2xl tracking-wide">
                gridas<span className="text-red-500">Care</span>
              </span>
            </div>
            {/* Garis putih tepat di bawah tulisan, diatur lebarnya (w-44) dan posisinya disesuaikan agar di tengah */}
            <div className="w-26 h-0.5 bg-white mt-1 ml-10"></div>
          </div>

          <nav className="space-y-4 text-center">
            <Link
              href="/adm/dashboard"
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

        <div className="text-center pb-4">
          <button
            onClick={() => router.push('/login')}
            className="font-bold text-[#182232] hover:text-red-700 transition"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Konten Utama */}
      <main className="flex-1 p-8 overflow-y-auto bg-white">
        <div className="min-h-full">
          {children}
        </div>
      </main>
    </div>
  );
}