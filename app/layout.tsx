'use client';

import { usePathname } from 'next/navigation';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Cek apakah halaman saat ini adalah halaman admin
  const isAdminRoute = pathname?.startsWith('/adm');

  return (
    <html lang="id">
      <body className="bg-gray-50">
        {/* Navbar hanya muncul jika BUKAN halaman admin */}
        {!isAdminRoute && <Navbar />}
        
        <main>{children}</main>
        
        {/* Footer hanya muncul jika BUKAN halaman admin */}
        {!isAdminRoute && <Footer />}
      </body>
    </html>
  );
}