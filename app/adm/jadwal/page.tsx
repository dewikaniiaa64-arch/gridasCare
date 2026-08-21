"use client";

import { useEffect, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { useRouter } from "next/navigation";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

if (!STRAPI_URL) {
  throw new Error("NEXT_PUBLIC_STRAPI_URL belum diset");
}

const API_URL = `${STRAPI_URL}/api/jadwal-piket-ukss`;
export default function AdminJadwalPage() {
  const router = useRouter();

  const [dataJadwal, setDataJadwal] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  const [formData, setFormData] = useState({
    Nama: "",
    Jabatan: "",
    Hari: "",
    Jam: "",
  });

  const hariList = [
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jum'at",
  ];

  const jamList = [
    "07:00 - 09:00",
    "09:00 - 11:00",
    "11:00 - 13:00",
    "13:00 - 15:00",
  ];

  // ==============================
  // FETCH DATA SAAT HALAMAN DIBUKA
  // ==============================
  useEffect(() => {
    fetchJadwal();
  }, []);

  const fetchJadwal = async () => {
    try {
      const res = await fetch(`${API_URL}?populate=*`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.status === 401) {
        alert("Sesi kamu telah berakhir. Silakan login kembali.");
        window.location.href = "/";
        return;
      }

      if (!res.ok) {
        throw new Error(
          `Gagal memuat data (Status: ${res.status})`
        );
      }

      const result = await res.json();

      setDataJadwal(result.data || []);
    } catch (error) {
      console.error("Error saat fetch Strapi:", error);

      alert(
        "Koneksi ke Strapi terputus. Periksa koneksi ke server Railway."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // SIMPAN / EDIT DATA
  // ==============================
  const handleSave = async () => {
    if (!formData.Hari || !formData.Jam) {
      alert(
        "Pilih Hari dan Jam terlebih dahulu untuk menentukan jadwal!"
      );
      return;
    }

    const currentPayload = { ...formData };

    // Pisahkan jam
    const [jamMulai, jamSelesai] =
      currentPayload.Jam.split(" - ");

    const jamMulaiFormat =
      `${jamMulai}:00.000`;

    const jamSelesaiFormat =
      `${jamSelesai}:00.000`;

    // Bersihkan hari untuk pencarian
    const selectedHariClean =
      currentPayload.Hari
        .trim()
        .toLowerCase()
        .replace("'", "")
        .replace("’", "");

    const selectedJamMulaiClean =
      jamMulai.trim();

    // ==============================
    // CARI DATA YANG SUDAH ADA
    // ==============================
    const targetItem = dataJadwal.find(
      (item: any) => {
        const attr =
          item.attributes || item;

        const dbHariClean =
          attr.Hari
            ? String(attr.Hari)
              .trim()
              .toLowerCase()
              .replace("'", "")
              .replace("’", "")
            : "";

        let dbJamMulaiClean = "";

        if (attr.Jam_Mulai) {
          dbJamMulaiClean =
            String(attr.Jam_Mulai)
              .slice(0, 5)
              .trim();
        } else if (attr.jam) {
          dbJamMulaiClean =
            String(attr.jam)
              .split("-")[0]
              .trim();
        }

        return (
          dbHariClean === selectedHariClean &&
          dbJamMulaiClean === selectedJamMulaiClean
        );
      }
    );

    // Backup data sebelum perubahan
    const previousJadwal =
      [...dataJadwal];

    // Data yang dikirim ke Strapi
    const bodyPayload = {
      data: {
        Nama: currentPayload.Nama,
        Jabatan: currentPayload.Jabatan,
        Hari: currentPayload.Hari,
        Jam_Mulai: jamMulaiFormat,
        Jam_Selesai: jamSelesaiFormat,
      },
    };

    try {
      let res;

      // ==============================
      // JIKA DATA SUDAH ADA → UPDATE
      // ==============================
      if (targetItem) {
        const documentIdOrId =
          targetItem.documentId ||
          targetItem.id;

        res = await fetch(
          `${API_URL}/${documentIdOrId}`,
          {
            method: "PUT",

            headers: {
              "Content-Type":
                "application/json",

            },

            body: JSON.stringify(
              bodyPayload
            ),
          }
        );
      } else {
        // ==============================
        // JIKA BELUM ADA → TAMBAH DATA
        // ==============================
        res = await fetch(
          API_URL,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",


            },

            body: JSON.stringify(
              bodyPayload
            ),
          }
        );
      }

      // ==============================
      // CEK SESSION
      // ==============================
      if (res.status === 401) {
        alert(
          "Sesi kamu telah berakhir. Silakan login kembali."
        );

        window.location.href = "/";
        return;
      }

      // Ambil hasil dari Strapi
      const result =
        await res.json();

      // ==============================
      // CEK JIKA GAGAL
      // ==============================
      if (!res.ok) {
        console.error(
          "Error dari Strapi:",
          result
        );

        throw new Error(
          result?.error?.message ||
          "Gagal menyimpan data ke server"
        );
      }

      // Data terbaru dari Strapi
      const updatedItem =
        result.data;

      // =========================================
      // UPDATE TAMPILAN LANGSUNG
      // TANPA FETCH ULANG
      // =========================================

      if (targetItem) {
        // UPDATE DATA LAMA
        setDataJadwal(
          (prevData) =>
            prevData.map(
              (item: any) => {
                const itemId =
                  item.documentId ||
                  item.id;

                const targetId =
                  targetItem.documentId ||
                  targetItem.id;

                // Jika ID sama, ganti
                // dengan data terbaru
                if (
                  itemId === targetId
                ) {
                  return updatedItem;
                }

                return item;
              }
            )
        );
      } else {
        // TAMBAHKAN DATA BARU
        setDataJadwal(
          (prevData) => [
            ...prevData,
            updatedItem,
          ]
        );
      }

      // Tutup modal
      setOpenModal(false);

      // Kosongkan form
      setFormData({
        Nama: "",
        Jabatan: "",
        Hari: "",
        Jam: "",
      });

      console.log(
        "Data berhasil disimpan:",
        updatedItem
      );

    } catch (error) {
      console.error(
        "Error saat menyimpan:",
        error
      );

      // Kembalikan data sebelumnya
      // jika gagal
      setDataJadwal(
        previousJadwal
      );

      alert(
        "Gagal menyimpan data ke server."
      );
    }
  };

  return (
    <div className="w-full">

      {/* JUDUL */}
      <div className="flex justify-between items-center mb-6">

        <h1 className="text-4xl font-bold text-[#3B91FF]">
          Jadwal Petugas
        </h1>

        <button
          onClick={() =>
            setOpenModal(true)
          }
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

          <span>
            Edit Petugas
          </span>
        </button>

      </div>

      {/* CONTAINER JADWAL */}
      <div className="bg-[#EAEFF5] rounded-3xl p-5 shadow">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">

          {hariList.map((hari) => {

            return (
              <div
                key={hari}
                className="rounded-2xl overflow-hidden shadow"
              >

                {/* HEADER HARI */}
                <div className="bg-blue-950 text-white p-4 font-bold text-lg relative flex items-center justify-center">

                  <img
                    src="/images/kalender1.png"
                    alt="Calendar"
                    className="w-8 absolute left-4"
                  />

                  <span>
                    {hari}
                  </span>

                </div>

                {/* JADWAL */}
                <div className="bg-blue-300">

                  {loading ? (

                    <div className="p-5 text-center">
                      Memuat...
                    </div>

                  ) : (

                    jamList.map(
                      (jamSlot) => {

                        const [
                          slotMulai,
                        ] =
                          jamSlot.split(
                            " - "
                          );

                        const currentHariClean =
                          hari
                            .trim()
                            .toLowerCase()
                            .replace(
                              "'",
                              ""
                            )
                            .replace(
                              "’",
                              ""
                            );

                        const currentJamMulaiClean =
                          slotMulai.trim();

                        const matchedItem =
                          dataJadwal.find(
                            (
                              item: any
                            ) => {

                              const attr =
                                item.attributes ||
                                item;

                              const dbHariClean =
                                attr.Hari
                                  ? String(
                                    attr.Hari
                                  )
                                    .trim()
                                    .toLowerCase()
                                    .replace(
                                      "'",
                                      ""
                                    )
                                    .replace(
                                      "’",
                                      ""
                                    )
                                  : "";

                              let dbJamMulaiClean =
                                "";

                              if (
                                attr.Jam_Mulai
                              ) {
                                dbJamMulaiClean =
                                  String(
                                    attr.Jam_Mulai
                                  )
                                    .slice(
                                      0,
                                      5
                                    )
                                    .trim();
                              } else if (
                                attr.jam
                              ) {
                                dbJamMulaiClean =
                                  String(
                                    attr.jam
                                  )
                                    .split(
                                      "-"
                                    )[0]
                                    .trim();
                              }

                              return (
                                dbHariClean ===
                                currentHariClean &&
                                dbJamMulaiClean ===
                                currentJamMulaiClean
                              );
                            }
                          );

                        const attr =
                          matchedItem
                            ? (
                              matchedItem.attributes ||
                              matchedItem
                            )
                            : null;

                        return (
                          <div
                            key={jamSlot}
                            className="p-4 border-b bg-blue-300"
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

                              <span>
                                {jamSlot}
                              </span>

                            </div>

                            <div className="flex gap-3 items-center">

                              <img
                                src="/images/icon1.png"
                                alt="Icon"
                                className="w-16 h-16 object-cover"
                              />

                              <div className="flex-1">

                                {attr &&
                                  (
                                    attr.Nama ||
                                    attr.nama
                                  ) ? (

                                  <>
                                    <p className="font-bold text-sm">
                                      {attr.Nama ||
                                        attr.nama}
                                    </p>

                                    <p className="text-sm text-gray-700">
                                      {attr.Jabatan ||
                                        attr.jabatan ||
                                        "-"}
                                    </p>
                                  </>

                                ) : (

                                  <>
                                    <p className="font-bold text-sm">
                                      Belum ada data
                                    </p>

                                    <p className="text-sm text-gray-700">
                                      -
                                    </p>
                                  </>

                                )}

                              </div>

                            </div>

                          </div>
                        );
                      }
                    )

                  )}

                </div>

              </div>
            );
          })}

        </div>

      </div>

      {/* MODAL */}
      {openModal && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">

          <div className="relative bg-white w-[500px] rounded-[28px] p-8 shadow-2xl">

            {/* TOMBOL KEMBALI */}
            <button
              onClick={() =>
                setOpenModal(false)
              }
              className="absolute top-8 left-12 text-[#2563EB]"
            >
              <IoArrowBack className="text-[38px]" />
            </button>

            <h2 className="text-center text-3xl font-bold text-[#3B91FF] mt-6 mb-8">
              Jadwal Petugas
            </h2>

            <div className="space-y-5">

              {/* NAMA */}
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
                      Nama:
                        e.target.value,
                    })
                  }
                  className="w-full border rounded-lg p-3"
                />

              </div>

              {/* JABATAN */}
              <div>

                <label className="font-semibold block mb-2">
                  Jabatan
                </label>

                <select
                  value={
                    formData.Jabatan
                  }
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      Jabatan:
                        e.target.value,
                    })
                  }
                  className="w-full border rounded-lg p-3"
                >

                  <option value="">
                    Pilih Jabatan
                  </option>

                  <option value="Ketua">
                    Ketua
                  </option>

                  <option value="Wakil">
                    Wakil
                  </option>

                  <option value="Anggota">
                    Anggota
                  </option>

                </select>

              </div>

              {/* HARI */}
              <div>

                <label className="font-semibold block mb-2">
                  Hari
                </label>

                <select
                  value={formData.Hari}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      Hari:
                        e.target.value,
                    })
                  }
                  className="w-full border rounded-lg p-3"
                >

                  <option value="">
                    Pilih Hari
                  </option>

                  {hariList.map(
                    (hari) => (
                      <option
                        key={hari}
                        value={hari}
                      >
                        {hari}
                      </option>
                    )
                  )}

                </select>

              </div>

              {/* JAM */}
              <div>

                <label className="font-semibold block mb-2">
                  Jam
                </label>

                <select
                  value={formData.Jam}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      Jam:
                        e.target.value,
                    })
                  }
                  className="w-full border rounded-lg p-3"
                >

                  <option value="">
                    Pilih Jam
                  </option>

                  {jamList.map(
                    (jam) => (
                      <option
                        key={jam}
                        value={jam}
                      >
                        {jam}
                      </option>
                    )
                  )}

                </select>

              </div>

              {/* TOMBOL SIMPAN */}
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