"use client";

import { useState } from "react";

export default function DataSiswaSakit() {
  const [formData, setFormData] = useState({
    tanggal: "",
    nama: "",
    kelas: "",
    keluhan: "",
    penanganan: "",
  });

  // Data kelas
  const tingkat = ["X", "XI", "XII"];
  const jurusan = ["AKL", "MPLB", "PM", "PPLG"];
  const nomorKelas = [1, 2, 3, 4];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    alert("Data berhasil disimpan!");
  };

  return (
    <main
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-6 py-10"
      style={{
        backgroundImage: "url('/images/background.png')",
      }}
    >
      <div className="w-full max-w-5xl bg-white/10 backdrop-blur-sm rounded-3xl p-8 shadow-lg">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-10">
          Data Siswa Sakit
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Baris Atas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Tanggal */}
            <div>
              <label className="block text-lg font-semibold mb-2">
                Tanggal
              </label>

              <input
                type="date"
                name="tanggal"
                value={formData.tanggal}
                onChange={handleChange}
                className="w-full h-10 rounded-lg border border-gray-300 px-3 text-sm bg-white outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Nama */}
            <div>
              <label className="block text-lg font-semibold mb-2">
                Nama
              </label>

              <input
                type="text"
                name="nama"
                placeholder="Masukkan nama"
                value={formData.nama}
                onChange={handleChange}
                className="w-full h-10 rounded-lg border border-gray-300 px-3 text-sm bg-white outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Kelas */}
            <div>
              <label className="block text-lg font-semibold mb-2">
                Kelas
              </label>

              <select
                name="kelas"
                value={formData.kelas}
                onChange={handleChange}
                className="w-full h-10 rounded-lg border border-gray-300 px-3 text-sm bg-white outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Pilih Kelas</option>

                {tingkat.flatMap((t) =>
                  jurusan.flatMap((j) =>
                    nomorKelas.map((n) => (
                      <option
                        key={`${t}-${j}-${n}`}
                        value={`${t} ${j} ${n}`}
                      >
                        {t} {j} {n}
                      </option>
                    ))
                  )
                )}
              </select>
            </div>
          </div>

          {/* Textarea */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Keluhan */}
            <div>
              <label className="block text-lg font-semibold mb-2">
                Keluhan
              </label>

              <textarea
                name="keluhan"
                rows={5}
                value={formData.keluhan}
                onChange={handleChange}
                placeholder="Masukkan keluhan siswa..."
                className="w-full rounded-xl border border-gray-300 p-3 text-sm resize-none bg-white outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Penanganan */}
            <div>
              <label className="block text-lg font-semibold mb-2">
                Penanganan
              </label>

              <textarea
                name="penanganan"
                rows={5}
                value={formData.penanganan}
                onChange={handleChange}
                placeholder="Masukkan penanganan..."
                className="w-full rounded-xl border border-gray-300 p-3 text-sm resize-none bg-white outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Tombol */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-10 py-2.5 rounded-full shadow-md transition"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}