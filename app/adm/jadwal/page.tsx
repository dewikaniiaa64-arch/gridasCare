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
        'https://bmkvr3zj-1337.asse.devtunnels.ms/api/jadwal-piket-ukss?populate=*'
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
        `http://localhost:1337/api/jadwalpiket-ukss/${id}`,
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

        <button className="bg-[#182232] text-white px-5 py-3 rounded-xl font-semibold">
          + Edit Petugas
        </button>
      </div>

      {/* Container */}
      <div className="bg-[#EAEFF5] rounded-3xl p-5 shadow">

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">

          {hariList.map((hari) => {

            const dataHari = dataJadwal.filter((item: any) => {
  const attr = item.attributes || item;

  return (
    attr.Hari === hari ||
    attr.Hari === hari.replace("'", "")
  );
}).sort((a: any, b: any) => {
  const attrA = a.attributes || a;
  const attrB = b.attributes || b;
  
  const jamA = attrA.Jam_Mulai || "";
  const jamB = attrB.Jam_Mulai || "";

  return jamA.localeCompare(jamB);
});
            return (
              <div
                key={hari}
                className="rounded-2xl overflow-hidden border shadow"
              >

                {/* Header Hari */}
                <div className="bg-[#182232] text-white p-4 font-bold text-lg flex items-center gap-2">
                  📅 {hari}
                </div>

                {/* Isi */}
                <div className="bg-[#BFE3FF]">

                  {loading ? (
                    <div className="p-5 text-center">
                      Memuat...
                    </div>
                  ) : dataHari.length > 0 ? (

                    dataHari.map((item: any) => {

                      const attr = item.attributes || item;

                      const jamMulai =
                        attr.Jam_Mulai?.slice(0, 5) || '--:--';

                      const jamSelesai =
                        attr.Jam_Selesai?.slice(0, 5) || '--:--';

                      return (
                        <div
                          key={item.id}
                          className="p-4 border-b"
                        >

                          <div className="text-sm mb-3">
                            🕒 {jamMulai} - {jamSelesai}
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
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="p-4 border-b"
                        >

                          <div className="text-sm mb-3">
                            🕒 --:-- - --:--
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
