'use client';

import { useEffect, useState } from 'react';

export default function AdminJadwalPage() {
  const [dataJadwal, setDataJadwal] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="w-full">

      {/* Judul */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-[#3B91FF]">
          Jadwal Petugas
        </h1>

       <button className="bg-[#182232] text-white px-5 py-3 rounded-xl font-semibold flex items-center gap-2 hover:bg-[#243246] transition">
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

  <button
    onClick={() => handleDelete(item.id)}
    className="text-red-500"
  >
    🗑️
  </button>

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

    </div>
  );
}