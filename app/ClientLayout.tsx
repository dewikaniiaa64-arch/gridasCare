'use client';

import { usePathname } from 'next/navigation';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './globals.css';

// PERHATIKAN: Pakai "export default function"
export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/adm');

  return (
    <html lang="id">
      <body className="bg-gray-50">
        {!isAdminRoute && <Navbar />}
        <main>{children}</main>
        {!isAdminRoute && <Footer />}
      </body>
    </html>
  );
}