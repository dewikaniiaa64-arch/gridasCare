"use client";

import { useState } from "react";
import SidebarAdmin from "@/app/components/Admin/Jadwal/SidebarAdmin";
import JadwalTable from "@/app/components/Admin/Jadwal/JadwalTable";
import FormJadwal from "@/app/components/Admin/Jadwal/FormJadwal";

// 1. Definisikan tipe data item jadwal secara global di file ini
export type JadwalItem = {
  id:string;
  hari: string;
  jam: string;
  nama: string;
  jabatan: string;
};

export default function AdminJadwalPage() {
  // State utama penampung list jadwal
  const [jadwalList, setJadwalList] = useState<JadwalItem[]>([
    { id: "1", hari: "Senin", jam: "07:00-09:00", nama: "Andi Wijaya", jabatan: "Ketua PMR" },
    { id: "2", hari: "Selasa", jam: "09:00-11:00", nama: "Eka Putri", jabatan: "Bendahara" },
  ]);

  // State menampung data yang sedang di-edit (jika tidak ada nilainya null)
  const [editingItem, setEditingItem] = useState<JadwalItem | null>(null);

  // Fungsi Create (Tambah) & Update (Simpan Perubahan)
  const handleFormSubmit = (formData: { hari: string; jam: string; nama: string; jabatan: string }) => {
    if (editingItem) {
      // Aksi jika sedang mode EDIT
      setJadwalList(
        jadwalList.map((item) =>
          item.id === editingItem.id ? { ...item, ...formData } : item
        )
      );
      setEditingItem(null); // Keluar dari mode edit setelah simpan
    } else {
      // Aksi jika sedang mode TAMBAH
      const newItem: JadwalItem = {
        id: Date.now().toString(), // Bikin ID unik string berbasis waktu
        ...formData,
      };
      setJadwalList([...jadwalList, newItem]);
    }
  };

  // Fungsi Hapus Data
  const handleDelete = (id: string) => {
    if (confirm("Apakah kamu yakin ingin menghapus jadwal ini?")) {
      setJadwalList(jadwalList.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-100 text-gray-800">
      {/* Sidebar Kiri */}
      <SidebarAdmin />

      {/* Konten Utama Dashboard Admin */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6 text-blue-900">Dashboard Admin - CRUD Jadwal</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* KOLOM KIRI: Form Input (Tambah / Edit) */}
          <div className="bg-white p-6 rounded-xl shadow border h-fit">
            <h2 className="text-xl font-bold mb-4 text-gray-700">
              {editingItem ? "🔄 Edit Jadwal" : "➕ Tambah Jadwal"}
            </h2>
            
            {/* FormJadwal Component */}
            <FormJadwal
              key={editingItem ? editingItem.id : "tambah"}
              defaultValues={editingItem || undefined}
              onSubmit={handleFormSubmit}
              buttonText={editingItem ? "Simpan Perubahan" : "Tambah Jadwal"}
            />

            {/* Tombol tambahan khusus untuk membatalkan proses edit */}
            {editingItem && (
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="w-full mt-2 bg-gray-400 text-white p-2 rounded font-bold hover:bg-gray-500 transition"
              >
                Batal Edit
              </button>
            )}
          </div>

          {/* KOLOM KANAN: Tabel Data Jadwal */}
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow border overflow-x-auto">
            <h2 className="text-xl font-bold mb-4 text-gray-700">📋 Daftar Jadwal Aktif</h2>
            
            <JadwalTable 
              data={jadwalList} 
              onDelete={handleDelete} 
              onEdit={(item) => setEditingItem(item)} 
            />
          </div>
        </div>
      </main>
    </div>
  );
}