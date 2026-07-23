'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Logika login sederhana
    if (username === "admin" && password === "caregridas") {
      router.push('/admin/jadwal');
    } else {
      alert("Username atau Password salah!");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Background Image */}
      <Image 
        src="/images/bc.png" 
        alt="Background" 
        fill 
        priority
        className="object-cover" 
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Login Card */}
      <div className="relative z-10 bg-white/90 p-8 rounded-3xl shadow-2xl w-full max-w-sm backdrop-blur-sm border border-white/20">
        <div className="flex flex-col items-center mb-6">
          <div className="text-red-500 text-4xl mb-2">🏥</div>
          <h2 className="text-2xl font-bold text-[#0A405A]">gridas<span className="text-red-500">Care</span></h2>
          <p className="text-sm text-gray-500">Login hanya admin</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0A405A] transition"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0A405A] transition"
              required
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-[#0A405A] text-white py-3 rounded-xl font-bold hover:bg-gray-800 transition shadow-lg mt-4"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}