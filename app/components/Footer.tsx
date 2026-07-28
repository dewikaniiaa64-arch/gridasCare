'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();

  const hideFooter =
    pathname === '/adm/dashboard' ||
    pathname === '/adm/jadwal' ||
    pathname === '/adm/input' ||
    pathname === '/login';

  if (hideFooter) {
    return null;
  }

  return (
    <footer className="bg-[#064663] py-6 px-6 md:px-10 text-white flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0 shadow-inner">
      {/* Bagian Kiri: Logo PMI & Nama Instansi */}
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

      {/* Bagian Kanan: Ikon Sosial Media (Telepon, Instagram, Email) */}
      <div className="flex items-center gap-6 text-2xl">
        <a href="tel:0261201531" className="hover:text-red-400 transition" aria-label="Telepon">
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.67963 4.65371L7.62623 3.70711C8.01675 3.31658 8.64992 3.31658 9.04044 3.70711L12.9596 7.62623C13.3501 8.01675 13.3501 8.64992 12.9596 9.04044L11.3623 10.6377C11.1459 10.8541 11.0923 11.1846 11.2292 11.4583C12.8114 14.6227 15.3773 17.1886 18.5417 18.7708C18.8154 18.9077 19.146 18.8541 19.3623 18.6377L20.9596 17.0404C21.3501 16.6499 21.9832 16.6499 22.3738 17.0404L26.2929 20.9596C26.6834 21.3501 26.6834 21.9832 26.2929 22.3738L25.3463 23.3204C23.2349 25.4317 19.8924 25.6693 17.5037 23.8777L13.6286 20.9714C11.885 19.6638 10.3362 18.115 9.02857 16.3714L6.12226 12.4964C4.33072 10.1076 4.56827 6.76506 6.67963 4.65371Z" stroke="white" strokeWidth="2"/>
          </svg>
        </a>
        
        <a
          href="https://www.instagram.com/pmr_gridas?igsh=MWphbjlqbmI4bHBlMg=="
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-red-400 transition"
          aria-label="Instagram"
        >
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.75 11.75C3.75 7.97876 3.75 6.09315 4.92157 4.92157C6.09315 3.75 7.97876 3.75 11.75 3.75H18.25C22.0212 3.75 23.9069 3.75 25.0784 4.92157C26.25 6.09315 26.25 7.97876 26.25 11.75V18.25C26.25 22.0212 26.25 23.9069 25.0784 25.0784C23.9069 26.25 22.0212 26.25 18.25 26.25H11.75C7.97876 26.25 6.09315 26.25 4.92157 25.0784C3.75 23.9069 3.75 22.0212 3.75 18.25V11.75Z" stroke="white" strokeWidth="2"/>
            <circle cx="20.625" cy="9.375" r="1.875" fill="white"/>
            <circle cx="15" cy="15" r="4" stroke="white" strokeWidth="2"/>
          </svg>
        </a>

        <a href="mailto:smkn2sumedang@yahoo.com" className="hover:text-red-400 transition" aria-label="Email">
           <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="5.83337" y="8.75" width="23.3333" height="17.5" rx="2" stroke="white" strokeWidth="2"/>
            <path d="M5.83337 13.125L16.6056 18.5111C17.1687 18.7926 17.8314 18.7926 18.3945 18.5111L29.1667 13.125" stroke="white" strokeWidth="2"/>
          </svg>
        </a>
      </div>
    </footer>
  );
}