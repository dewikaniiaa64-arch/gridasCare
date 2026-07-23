"use client";

import { useState } from "react";
import { JadwalItem } from "@/app/admin/jadwal/page";

// Definisikan struktur parameter Props untuk FormJadwal
type FormProps = {
  defaultValues?: JadwalItem; // Menggunakan tipe JadwalItem utuh agar TypeScript aman
  onSubmit: (data: { hari: string; jam: string; nama: string; jabatan: string }) => void;
  buttonText: string;
};

export default function FormJadwal({ defaultValues, onSubmit, buttonText }: FormProps) {
  // Inisialisasi state form menggunakan data defaultValues (jika dalam mode edit)
  const [hari, setHari] = useState(defaultValues?.hari || "Senin");
  const [jam, setJam] = useState(defaultValues?.jam || "");
  const [nama, setNama] = useState(defaultValues?.nama || "");
  const [jabatan, setJabatan] = useState(defaultValues?.jabatan || "");

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jam || !nama || !jabatan) return alert("Semua kolom harus diisi!");
    
    // Kirim data kembali ke page.tsx melalui fungsi onSubmit
    onSubmit({ hari, jam, nama, jabatan });
    
    // Reset form jika bukan dalam mode mengedit
    if (!defaultValues) {
      setJam("");
      setNama("");
      setJabatan("");
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
      <div>
        <label className="block text-sm font-semibold mb-1 text-gray-600">Hari</label>
        <select 
          value={hari} 
          onChange={(e) => setHari(e.target.value)} 
          className="w-full border p-2 rounded bg-white text-gray-800 focus:outline-blue-500"
        >
          <option value="Senin">Senin</option>
          <option value="Selasa">Selasa</option>
          <option value="Rabu">Rabu</option>
          <option value="Kamis">Kamis</option>
          <option value="Jumat">Jumat</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1 text-gray-600">Jam Piket</label>
        <input 
          type="text" 
          value={jam} 
          onChange={(e) => setJam(e.target.value)} 
          className="w-full border p-2 rounded text-gray-800 focus:outline-blue-500" 
          placeholder="Contoh: 07:00-09:00" 
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1 text-gray-600">Nama Petugas</label>
        <input 
          type="text" 
          value={nama} 
          onChange={(e) => setNama(e.target.value)} 
          className="w-full border p-2 rounded text-gray-800 focus:outline-blue-500" 
          placeholder="Nama Lengkap"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1 text-gray-600">Jabatan</label>
        <input 
          type="text" 
          value={jabatan} 
          onChange={(e) => setJabatan(e.target.value)} 
          className="w-full border p-2 rounded text-gray-800 focus:outline-blue-500" 
          placeholder="Contoh: Ketua / Anggota"
        />
      </div>

      <button 
        type="submit" 
        className="bg-blue-600 text-white p-2 rounded font-bold hover:bg-blue-700 transition"
      >
        {buttonText}
      </button>
    </form>
  );
}