'use client';

import { useEffect, useState } from 'react';
import { IoArrowBack } from "react-icons/io5"

export default function AdminJadwalPage() {
  const [dataJadwal, setDataJadwal] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
  Nama: "",
  Jabatan: "",
  Hari: "",
  Jam: "",
});

  const hariList = ['Senin', 'Selasa', 'Rabu', 'Kamis', "Jum'at"];

  useEffect(() => {
    fetchJadwal();
  }, []);

  const fetchJadwal = async () => {
    try {
      const res = await fetch(
        'http://localhost:1337/api/jadwal-piket-ukss?populate=*'
      );

      if (!res.ok) throw new Error();

      const result = await res.json();

      setDataJadwal(result.data || []);
    } catch (error) {
      console.log('Backend belum tersambung');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Hapus data?')) return;

    try {
      await fetch(
        `http://localhost:1337/api/jadwal-piket-ukss/${id}`,
        {
          method: 'DELETE',
        }
      );

      fetchJadwal();
    } catch (error) {
      alert('Gagal menghapus');
    }
  };

const handleSave = async () => {
  try {
    const [jamMulai, jamSelesai] = formData.Jam.split(" - ");

    const res = await fetch(
      "http://localhost:1337/api/jadwal-piket-ukss",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            Nama: formData.Nama,
            Jabatan: formData.Jabatan,
            Hari: formData.Hari,
            Jam_Mulai: jamMulai,
            Jam_Selesai: jamSelesai,
          },
        }),
      }
    );

    if (!res.ok) {
      throw new Error("Gagal menyimpan");
    }

    alert("Data berhasil disimpan!");

    setOpenModal(false);

    setFormData({
      Nama: "",
      Jabatan: "",
      Hari: "",
      Jam: "",
    });

    fetchJadwal();

  } catch (error) {
    alert("Gagal menyimpan data");
  }
};

  return (
    <div className="w-full">

      {/* Judul */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-[#3B91FF]">
          Jadwal Petugas
        </h1>

      <button
  onClick={() => setOpenModal(true)}
  className="bg-[#182232] text-white px-5 py-3 rounded-xl font-semibold flex items-center gap-2 hover:bg-[#243246] transition"
>
  <svg
    width="30"
    height="30"
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="15"
      cy="15"
      r="11.25"
      stroke="white"
      strokeWidth="2"
    />
    <path
      d="M15 18.75L15 11.25"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="square"
    />
    <path
      d="M18.75 15L11.25 15"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="square"
    />
  </svg>

  <span>Edit Petugas</span>
</button>
      </div>

      {/* Container */}
      <div className="bg-[#EAEFF5] rounded-3xl p-5 shadow">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">

          {hariList.map((hari) => {

            const dataHari = dataJadwal.filter((item: any) => {

              const attr = item.attributes || item;

              return (
                attr.Hari === hari ||
                attr.Hari === hari.replace("'", "")
              );
            });

            return (
             <div
  key={hari}
  className="rounded-2xl overflow-hidden shadow"
>

                {/* Header Hari */}
                <div className="bg-blue-950 text-white p-4 font-bold text-lg relative flex items-center justify-center">
  <img
    src="/images/kalender1.png"
    alt="Calendar"
    className="w-8 absolute left-4"
  />

  <span>{hari}</span>
</div>

                {/* Isi */}
                <div className="bg-blue-300">

                  {loading ? (
                    <div className="p-5 text-center">
                      Memuat...
                    </div>
                  ) : dataHari.length > 0 ? (

                    dataHari.map((item: any) => {

                      const attr = item.attributes || item;

                      const jamMulai =
                        attr.Jam_Mulai?.slice(0,5) || '--:--';

                      const jamSelesai =
                        attr.Jam_Selesai?.slice(0,5) || '--:--';

                      return (
                        <div
                          key={item.id}
                          className="p-4 border-b bg-[#DFF1FF]"
                        >

                          <div className="flex items-center gap-2 text-sm mb-3">
  <svg
    width="20"
    height="20"
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <ellipse
      cx="15"
      cy="15"
      rx="12.5"
      ry="12.5"
      stroke="#07479B"
      strokeWidth="1.5"
    />
    <path
      d="M15 10V15L17.5 17.5"
      stroke="#07479B"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>

  <span>{jamMulai} - {jamSelesai}</span>
</div>

<div className="flex gap-3 items-center">

  <img
  src="/images/icon1.png"
  alt="Icon"
  className="w-16 h-16 object-cover"
/>

  <div className="flex-1">
    <p className="font-bold text-sm">
      {attr.Nama}
    </p>

    <p className="text-sm text-gray-700">
      {attr.Jabatan}
    </p>
  </div>
                          </div>
                        </div>
                      );
                    })

                  ) : (

                    <>
                      {[1,2,3,4].map((i) => (
                        <div
                          key={i}
                          className="p-4 border-b"
                        >

                          <div className="flex items-center gap-2 text-sm mb-3">
  <svg
    width="20"
    height="20"
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <ellipse
      cx="15"
      cy="15"
      rx="12.5"
      ry="12.5"
      stroke="#07479B"
      strokeWidth="1.5"
    />
    <path
      d="M15 10V15L17.5 17.5"
      stroke="#07479B"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>

  <span>--:-- - --:--</span>
</div>

                          <div className="flex gap-3">

                           <img
  src="/images/icon1.png"
  alt="Icon"
  className="w-16 h-16 object-cover"
/>

                            <div>
                              <p className="font-bold">
                                Belum ada data
                              </p>

                              <p className="text-sm">
                                -
                              </p>
                            </div>

                          </div>

                        </div>
                      ))}
                    </>
                  )}

                </div>
              </div>
            );
          })}

        </div>

      </div>
{openModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">

    <div className="relative bg-white w-[500px] rounded-[28px] p-8 shadow-2xl">

      {/* Tombol kembali */}
      <button
        onClick={() => setOpenModal(false)}
        className="absolute top-8 left-12 text-[#2563EB]"
      >
       <IoArrowBack className="text-[38px]" />
      </button>

      <h2 className="text-center text-3xl font-bold text-[#3B91FF] mt-6 mb-8">
        Jadwal Petugas
      </h2>

      <div className="space-y-5">

        <div>
          <label className="font-semibold block mb-2">
            Nama
          </label>

          <input
  type="text"
  placeholder="Nama"
  value={formData.Nama}
  onChange={(e) =>
    setFormData({
      ...formData,
      Nama: e.target.value,
    })
  }
  className="w-full border rounded-lg p-3"
/>
        </div>

        <div>
          <label className="font-semibold block mb-2">
            Jabatan
          </label>

         <select
  value={formData.Jabatan}
  onChange={(e) =>
    setFormData({
      ...formData,
      Jabatan: e.target.value,
    })
  }
  className="w-full border rounded-lg p-3"
>
  <option value="">Pilih Jabatan</option>
  <option value="Ketua">Ketua</option>
  <option value="Wakil">Wakil</option>
  <option value="Anggota">Anggota</option>
</select>
        </div>

        <div>
          <label className="font-semibold block mb-2">
            Hari
          </label>

          <select
  value={formData.Hari}
  onChange={(e) =>
    setFormData({
      ...formData,
      Hari: e.target.value,
    })
  }
  className="w-full border rounded-lg p-3"
>
  <option value="">Pilih Hari</option>
  <option value="Senin">Senin</option>
  <option value="Selasa">Selasa</option>
  <option value="Rabu">Rabu</option>
  <option value="Kamis">Kamis</option>
  <option value="Jum'at">Jum'at</option>
</select>
        </div>

        <div>
          <label className="font-semibold block mb-2">
            Jam
          </label>

          <select
  value={formData.Jam}
  onChange={(e) =>
    setFormData({
      ...formData,
      Jam: e.target.value,
    })
  }
  className="w-full border rounded-lg p-3"
>
  <option value="">Pilih Jam</option>
  <option value="07:00 - 09:00">07:00 - 09:00</option>
  <option value="09:00 - 11:00">09:00 - 11:00</option>
  <option value="11:00 - 13:00">11:00 - 13:00</option>
  <option value="13:00 - 15:00">13:00 - 15:00</option>
</select>
        </div>

        <div className="flex justify-center pt-4">

          <button
            onClick={handleSave}
            className="bg-[#2563EB] text-white px-12 py-3 rounded-full font-bold hover:bg-blue-700"
          >
            Simpan
          </button>

        </div>

      </div>

    </div>

  </div>
)}
    </div>
  );
}