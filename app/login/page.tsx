'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (data.success) {
        router.push('/adm/dashboard');
      } else {
        alert(data.message || "Username atau Password salah!");
      }
    } catch (err) {
      alert("Terjadi kesalahan koneksi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden">
      <Image
        src="/images/login.png"
        alt="Background"
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/25"></div>
      <Link
        href="/"
        aria-label="Kembali ke Beranda"
        className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20 text-black/50 hover:text-black/60 transition-colors p-1"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
          />
        </svg>
      </Link>

      <div className="relative z-10 bg-cyan-600/95 py-5 sm:p-7 rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-[300px] sm:max-w-sm border border-black/60 text-white flex flex-col items-center">

        <div className="flex flex-col items-center mb-4 sm:mb-6">
          <div className="w-12 h-12 sm:w-16 sm:h-16 mb-1 relative flex items-center justify-center">
            <img
              src="/images/pmi.png"
              alt="Logo UKS"
              className="w-full h-full object-contain drop-shadow"
            />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white drop-shadow-sm">
            gridas<span className="text-red-500">Care</span>
          </h2>
        </div>

        {/* Form Login */}
        <form onSubmit={handleLogin} className="w-full space-y-3.5 px-1">
          <div>
            <label className="block text-white font-semibold text-xs sm:text-sm mb-1 drop-shadow-sm">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full bg-white text-gray-800 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 border border-gray-300 shadow-inner"
              placeholder="Username"
              required
            />
          </div>

          <div>
            <label className="block text-white font-semibold text-xs sm:text-sm mb-1 drop-shadow-sm">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full bg-white text-gray-800 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 border border-gray-300 shadow-inner"
              placeholder="Password"
              required
            />
          </div>

          <div className="pt-2 flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className="w-3/5 sm:w-1/2 bg-blue-600 text-white py-1.5 sm:py-2 rounded-full font-bold text-xs sm:text-sm hover:bg-blue-400 transition-all shadow-md active:scale-95 border border-black/20 cursor-pointer disabled:opacity-50"
            >
              {loading ? 'Memproses...' : 'Login'}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}