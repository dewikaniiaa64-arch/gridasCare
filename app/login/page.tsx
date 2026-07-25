'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (username === "admin" && password === "caregridas") {
      router.push('/admin/jadwal');
    } else {
      alert("Username atau Password salah!");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden">
      {/* 1. Background Image Utama */}
      <Image
        src="/images/login.png"
        alt="Background"
        fill
        priority
        className="object-cover"
      />

      {/* 2. Overlay Lapisan Transparan Sesuai Figma */}
      <div className="absolute inset-0 bg-[#0A405A]/30 mix-blend-multiply"></div>
      <div className="absolute inset-0 bg-sky-200/40"></div>

      {/* 3. Icon Home di Pojok Kiri Atas */}
      <Link
        href="/"
        className="absolute top-6 left-6 z-20 text-[#0A405A] hover:text-black transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.8}
          stroke="currentColor"
          className="w-8 h-8 md:w-10 md:h-10 drop-shadow-sm"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
          />
        </svg>
      </Link>

      {/* 4. Card Login Jelas dengan Border Hitam Tegas */}
      <div className="relative z-10 bg-gradient-to-b from-[#7ec5e3] via-[#5b9eb4] to-[#467d8d] p-8 md:p-10 rounded-[32px] shadow-2xl w-full max-w-sm md:max-w-md border-2 border-black/80 text-white flex flex-col items-center">

        {/* Header Logo UKS & Nama App */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 md:w-20 md:h-20 mb-2 relative flex items-center justify-center">
            <img
              src="/images/pmi.png"
              alt="Logo UKS"
              className="w-full h-full object-contain drop-shadow"
            />
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white drop-shadow-sm">
            gridas<span className="text-red-500">Care</span>
          </h2>
        </div>

        {/* Form Login */}
        <form onSubmit={handleLogin} className="w-full space-y-5 px-2">
          <div>
            <label className="block text-white font-semibold text-lg mb-1.5 drop-shadow-sm">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2.5 rounded-full bg-white text-gray-800 text-base focus:outline-none focus:ring-2 focus:ring-blue-400 border border-gray-400 shadow-inner"
              required
            />
          </div>

          <div>
            <label className="block text-white font-semibold text-lg mb-1.5 drop-shadow-sm">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-full bg-white text-gray-800 text-base focus:outline-none focus:ring-2 focus:ring-blue-400 border border-gray-400 shadow-inner"
              required
            />
          </div>

          <div className="pt-4 flex justify-center">
            <button
              type="submit"
              className="w-1/2 bg-[#0066FF] text-white py-2.5 rounded-full font-bold text-lg hover:bg-blue-600 transition-all shadow-md active:scale-95 border border-black/20"
            >
              LOGIN
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}