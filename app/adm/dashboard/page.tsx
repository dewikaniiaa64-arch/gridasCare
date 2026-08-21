"use client";

import { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

if (!STRAPI_URL) {
  throw new Error("NEXT_PUBLIC_STRAPI_URL belum diset");
}
interface SiswaSakitItem {
  id: number;
  documentId?: string;
  nama: string;
  kelas: string;
  keluhan: string;
  tanggal: string;
  penanganan: string;
  status: string;
}

const STATUS_OPTIONS = [
  "Istirahat di UKS",
  "Kembali ke Kelas",
  "Dipulangkan",
  "Rujukan RS",
];

export default function AdminSiswaSakitPage() {
  const [dataSiswa, setDataSiswa] = useState<SiswaSakitItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  // PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // EXPORT
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportFormat, setExportFormat] = useState<"pdf" | "excel">("pdf");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // DETAIL
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<SiswaSakitItem | null>(null);

  // EDIT STATUS
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEditItem, setSelectedEditItem] = useState<SiswaSakitItem | null>(null);
  const [selectedStatus, setSelectedStatus] = useState("Istirahat di UKS");
  const [savingStatus, setSavingStatus] = useState(false);

  // DELETE
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedDeleteItem, setSelectedDeleteItem] = useState<{
    id: number;
    documentId?: string;
  } | null>(null);

  // FETCH DATA DARI STRAPI
  const fetchDataSiswa = async () => {
    try {
      setLoading(true);
      // Mengurutkan data berdasarkan tanggal dibuat (createdAt) secara descending
      const res = await fetch(`${STRAPI_URL}/api/siswa-sakits?populate=*&sort=createdAt:desc`);

      if (!res.ok) {
        throw new Error("Gagal mengambil data dari Strapi");
      }

      const result = await res.json();
      const rawData = result.data || [];

      const formatted: SiswaSakitItem[] = rawData.map((item: any) => {
        const attr = item.attributes || item;

        return {
          id: item.id,
          documentId: item.documentId,
          nama: attr.Nama || attr.nama || "-",
          kelas: attr.Kelas || attr.kelas || "-",
          keluhan: attr.Keluhan || attr.keluhan || "-",
          tanggal: attr.Tanggal || attr.tanggal || "-",
          penanganan: attr.Penanganan || attr.penanganan || "-",
          status: attr.Status_Siswa || attr.status_siswa || attr.Status || "Istirahat di UKS",
        };
      });

      setDataSiswa(formatted);
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDataSiswa();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // STATUS STYLE
  const getStatusStyle = (status: string) => {
    const cleanStatus = status.trim();
    switch (cleanStatus) {
      case "Istirahat di UKS":
        return "bg-yellow-100 text-yellow-700";
      case "Kembali ke Kelas":
        return "bg-green-100 text-green-700";
      case "Dipulangkan":
        return "bg-red-100 text-red-700";
      case "Rujukan RS":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusDot = (status: string) => {
    const cleanStatus = status.trim();
    switch (cleanStatus) {
      case "Istirahat di UKS":
        return "bg-yellow-500";
      case "Kembali ke Kelas":
        return "bg-green-500";
      case "Dipulangkan":
        return "bg-red-500";
      case "Rujukan RS":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  // MODAL HANDLERS
  const openDetailModal = (item: SiswaSakitItem) => {
    setSelectedItem(item);
    setShowDetailModal(true);
  };

  const openEditModal = (item: SiswaSakitItem) => {
    setSelectedEditItem(item);
    setSelectedStatus(item.status || "Istirahat di UKS");
    setShowEditModal(true);
  };

  const updateStatus = async () => {
    if (!selectedEditItem) return;

    try {
      setSavingStatus(true);
      const targetId = selectedEditItem.documentId || selectedEditItem.id;

      const res = await fetch(`${STRAPI_URL}/api/siswa-sakits/${targetId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: {
            Status_Siswa: selectedStatus
          },
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        const errorMsg = result?.error?.message || "Gagal mengubah status";
        throw new Error(errorMsg);
      }

      alert("Status siswa berhasil diperbarui.");
      setShowEditModal(false);
      setSelectedEditItem(null);
      await fetchDataSiswa();
    } catch (error: any) {
      console.error("Error update status:", error);
      alert(`Gagal mengubah status siswa: ${error.message || "Periksa koneksi Strapi"}`);
    } finally {
      setSavingStatus(false);
    }
  };

  const openDeleteModal = (id: number, documentId?: string) => {
    setSelectedDeleteItem({ id, documentId });
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!selectedDeleteItem) return;

    try {
      const targetId = selectedDeleteItem.documentId || selectedDeleteItem.id;

      const res = await fetch(`${STRAPI_URL}/api/siswa-sakits/${targetId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Gagal menghapus data");

      alert("Data berhasil dihapus.");
      await fetchDataSiswa();
    } catch (error) {
      console.error("Error deleting:", error);
      alert("Terjadi kesalahan saat menghapus data.");
    } finally {
      setShowDeleteModal(false);
      setSelectedDeleteItem(null);
    }
  };

  // EXPORT FUNCTION
  const handleExportSubmit = () => {
    let dataToExport = dataSiswa;

    if (startDate && endDate) {
      dataToExport = dataToExport.filter((item) => {
        const itemDate = item.tanggal;
        return itemDate >= startDate && itemDate <= endDate;
      });
    }

    if (!dataToExport || dataToExport.length === 0) {
      alert("Tidak ada data untuk diexport!");
      return;
    }

    if (exportFormat === "excel") {
      const worksheet = XLSX.utils.json_to_sheet(dataToExport);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Laporan Data");
      XLSX.writeFile(workbook, "Laporan_GridasCare.xlsx");
    } else if (exportFormat === "pdf") {
      const doc = new jsPDF();

      try {
        const logoUrl = "/images/pmi.png";
        doc.addImage(logoUrl, "PNG", 14, 12, 12, 12);
      } catch (err) {
        console.log("Logo tidak ditemukan:", err);
      }

      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.text("Laporan Data Siswa Sakit", 30, 18);

      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.text("GridasCare - Unit Kesehatan Sekolah", 30, 24);

      if (startDate && endDate) {
        doc.setFontSize(9);
        doc.text(`Periode: ${startDate} s/d ${endDate}`, 14, 34);
      }

      const tableData = dataToExport.map((item, index) => [
        index + 1,
        item.nama,
        item.kelas,
        item.keluhan,
        item.tanggal,
        item.penanganan,
        item.status.trim(),
      ]);

      autoTable(doc, {
        startY: startDate && endDate ? 40 : 32,
        head: [
          ["No", "Nama", "Kelas", "Keluhan", "Tanggal", "Penanganan", "Status"],
        ],
        body: tableData,
        styles: { fontSize: 8, cellPadding: 3 },
        headStyles: {
          fillColor: [11, 58, 96],
          textColor: 255,
          fontStyle: "bold",
        },
        alternateRowStyles: { fillColor: [245, 248, 252] },
      });

      doc.save("Laporan_GridasCare.pdf");
    }

    setShowExportModal(false);
  };

  const generateSuratPDF = (item: SiswaSakitItem) => {
    const doc = new jsPDF();
    const isDipulangkan = item.status.trim() === "Dipulangkan";

    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("SMK NEGERI 2 SUMEDANG", 105, 18, { align: "center" });
    doc.setFontSize(12);
    doc.text("UNIT KESEHATAN SEKOLAH (UKS)", 105, 25, { align: "center" });
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.text("Jl. Arief Rakhman Hakim NO. 59 Sumedang ", 105, 30, { align: "center" });

    doc.setLineWidth(0.8);
    doc.line(20, 34, 190, 34);

    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    const judulSurat = isDipulangkan
      ? "SURAT KETERANGAN IZIN PULANG KARENA SAKIT"
      : "SURAT RUJUKAN KESEHATAN";
    doc.text(judulSurat, 105, 45, { align: "center" });

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("Yang bertanda tangan di bawah ini Petugas UKS menerangkan bahwa:", 20, 58);

    doc.text(`Nama Lengkap   : ${item.nama}`, 25, 68);
    doc.text(`Kelas                : ${item.kelas}`, 25, 75);
    doc.text(`Keluhan / Sakit   : ${item.keluhan}`, 25, 82);
    doc.text(`Tanggal / Waktu  : ${item.tanggal}`, 25, 89);
    doc.text(`Penanganan      : ${item.penanganan}`, 25, 96);

    const deskripsi = isDipulangkan
      ? "Siswa tersebut di atas dinyatakan perlu DIPULANGKAN untuk beristirahat di rumah/penanganan lebih lanjut oleh orang tua."
      : "Siswa tersebut di atas perlu DIRUJUK ke Fasilitas Kesehatan / Rumah Sakit untuk penanganan medis lebih lanjut.";

    doc.text(deskripsi, 20, 110, { maxWidth: 170 });
    doc.text("Demikian surat keterangan ini dibuat untuk dipergunakan sebagaimana mestinya.", 20, 125);

    doc.text("Sumedang, " + item.tanggal.split(" ")[0], 140, 145);
    doc.text("Petugas UKS,", 140, 152);
    doc.text("( ..................................... )", 140, 180);

    const namaFile = isDipulangkan
      ? `Surat_Izin_Pulang_${item.nama.replace(/\s+/g, "_")}.pdf`
      : `Surat_Rujukan_${item.nama.replace(/\s+/g, "_")}.pdf`;

    doc.save(namaFile);
  };

  // FILTER & PAGINATION
  const filteredData = dataSiswa.filter(
    (item) =>
      item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tanggal.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.kelas.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.keluhan.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <div className="p-4 sm:p-6 md:p-10 w-full bg-white min-h-screen relative">
      <h1 className="text-2xl sm:text-3xl font-bold text-[#3B91FF] mb-4 sm:mb-6">
        Riwayat Siswa Sakit
      </h1>

      <div className="bg-[#EAEFF5] rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm border border-gray-200">
        {/* SEARCH + EXPORT */}
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 sm:gap-4 mb-6">
          <div className="relative w-full sm:w-72">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 0 0114 0z"
                />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Cari siswa/tanggal/kelas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white rounded-full border border-gray-300 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 text-black"
            />
          </div>

          <button
            onClick={() => setShowExportModal(true)}
            className="bg-[#0D2840] text-white px-5 py-2.5 sm:py-2 rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-slate-800 transition shadow cursor-pointer"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 40 35"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M31.7998 11.667C32.9199 11.667 33.4804 11.6668 33.9082 11.8848C34.2844 12.0765 34.5905 12.3825 34.7822 12.7588C35.0001 13.1865 35 13.7466 35 14.8662V25.9668C35 27.0864 35 27.6465 34.7822 28.0742C34.5905 28.4504 34.2844 28.7565 33.9082 28.9482C33.4804 29.1662 32.9199 29.167 31.7998 29.167H8.2002C7.08009 29.167 6.51962 29.1662 6.0918 28.9482C5.71563 28.7565 5.40946 28.4504 5.21777 28.0742C5.00001 27.6465 5 27.0864 5 25.9668V11.667H31.7998ZM17.499 22.0039L13.9912 18.9355L13.333 19.6875L12.6748 20.4404L16.8408 24.0859L17.5 24.6621L18.1582 24.0859L26.4912 16.7949L25.1748 15.2891L17.499 22.0039Z"
                fill="white"
              />
              <path
                d="M5 11.2917C5 9.40605 5 8.46324 5.58579 7.87745C6.17157 7.29166 7.11438 7.29166 9 7.29166H15.1637C15.9069 7.29166 16.2785 7.29166 16.6187 7.41946C16.9588 7.54725 17.2384 7.79195 17.7977 8.28136L21.6667 11.6667H5V11.2917Z"
                fill="white"
              />
            </svg>
            Export Laporan
          </button>
        </div>

        {/* TABEL DESKTOP (Layar Besar) */}
        <div className="hidden lg:block bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#93C5FD] text-[#0D2840] text-xs font-bold uppercase tracking-wider border-b border-blue-200">
                <th className="px-4 py-3.5 text-center w-12">No</th>
                <th className="px-4 py-3.5">Nama</th>
                <th className="px-4 py-3.5">Kelas</th>
                <th className="px-4 py-3.5">Keluhan</th>
                <th className="px-4 py-3.5">Tanggal & Waktu</th>
                <th className="px-4 py-3.5">Penanganan</th>
                <th className="px-4 py-3.5 text-center">Status</th>
                <th className="px-4 py-3.5 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs text-gray-700">
              {loading ? (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-gray-400">
                    Memuat data dari Strapi...
                  </td>
                </tr>
              ) : currentData.length > 0 ? (
                currentData.map((item, index) => (
                  <tr key={item.id} className="hover:bg-blue-50/50 transition">
                    <td className="px-4 py-3 text-center font-semibold text-gray-500">
                      {indexOfFirstItem + index + 1}
                    </td>
                    <td className="px-4 py-3 font-bold text-slate-900">
                      {item.nama}
                    </td>
                    <td className="px-4 py-3">{item.kelas}</td>
                    <td className="px-4 py-3">{item.keluhan}</td>
                    <td className="px-4 py-3">{item.tanggal}</td>
                    <td className="px-4 py-3">{item.penanganan}</td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full font-semibold whitespace-nowrap ${getStatusStyle(
                          item.status
                        )}`}
                      >
                        <span
                          className={`w-2.5 h-2.5 rounded-full ${getStatusDot(
                            item.status
                          )}`}
                        />
                        {item.status.trim()}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => openDetailModal(item)}
                          className="border border-gray-300 bg-white text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition cursor-pointer flex items-center gap-1.5 font-semibold"
                        >
                          Lihat
                        </button>
                        <button
                          onClick={() => openEditModal(item)}
                          className="border border-gray-300 bg-white text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition cursor-pointer flex items-center gap-1.5 font-semibold"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => openDeleteModal(item.id, item.documentId)}
                          className="border border-red-200 bg-white text-red-500 px-3 py-1.5 rounded-lg hover:bg-red-50 transition cursor-pointer flex items-center gap-1.5 font-semibold"
                        >
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-gray-400">
                    Belum ada data siswa sakit yang tercatat.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* TAMPILAN MOBILE & TABLET (Layar Kecil / Kartu) */}
        <div className="lg:hidden space-y-3">
          {loading ? (
            <div className="bg-white p-6 rounded-2xl text-center text-xs text-gray-400">
              Memuat data dari Strapi...
            </div>
          ) : currentData.length > 0 ? (
            currentData.map((item, index) => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 space-y-3 text-xs"
              >
                <div className="flex justify-between items-start gap-2 border-b pb-2">
                  <div>
                    <span className="text-[10px] text-gray-400 font-semibold uppercase">
                      #{indexOfFirstItem + index + 1}
                    </span>
                    <h3 className="font-bold text-sm text-gray-900">{item.nama}</h3>
                    <p className="text-gray-500 text-[11px]">{item.kelas}</p>
                  </div>
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap ${getStatusStyle(
                      item.status
                    )}`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${getStatusDot(
                        item.status
                      )}`}
                    />
                    {item.status.trim()}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-gray-700">
                  <div>
                    <span className="text-gray-400 block text-[10px]">Tanggal:</span>
                    <p className="font-medium">{item.tanggal}</p>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[10px]">Keluhan:</span>
                    <p className="font-medium line-clamp-1">{item.keluhan}</p>
                  </div>
                </div>

                <div className="pt-2 border-t flex items-center justify-end gap-2">
                  <button
                    onClick={() => openDetailModal(item)}
                    className="border border-gray-300 bg-white text-gray-700 px-3 py-1 rounded-lg text-[11px] font-semibold"
                  >
                    Lihat
                  </button>
                  <button
                    onClick={() => openEditModal(item)}
                    className="border border-gray-300 bg-white text-gray-700 px-3 py-1 rounded-lg text-[11px] font-semibold"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => openDeleteModal(item.id, item.documentId)}
                    className="border border-red-200 bg-white text-red-500 px-3 py-1 rounded-lg text-[11px] font-semibold"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white p-6 rounded-2xl text-center text-xs text-gray-400">
              Belum ada data siswa sakit yang tercatat.
            </div>
          )}
        </div>

        {/* PAGINATION */}
        {!loading && totalPages > 1 && (
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mt-6 px-1">
            <span className="text-xs text-gray-600 text-center sm:text-left">
              Menampilkan {indexOfFirstItem + 1} -{" "}
              {Math.min(indexOfLastItem, filteredData.length)} dari{" "}
              {filteredData.length} data
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-xs font-semibold text-gray-700 disabled:opacity-50 cursor-pointer"
              >
                Sebelumnya
              </button>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-xs font-semibold text-gray-700 disabled:opacity-50 cursor-pointer"
              >
                Selanjutnya
              </button>
            </div>
          </div>
        )}
      </div>

      {/* MODAL DETAIL */}
      {showDetailModal && selectedItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-5 sm:p-6 rounded-2xl w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b pb-3 mb-4">
              <h2 className="text-lg sm:text-xl font-bold text-black">
                Detail Siswa Sakit
              </h2>
              <button
                onClick={() => setShowDetailModal(false)}
                className="text-gray-500 text-xl font-bold p-1"
              >
                ✕
              </button>
            </div>
            <div className="space-y-3 text-xs sm:text-sm text-black">
              <p><b>Nama:</b> {selectedItem.nama}</p>
              <p><b>Kelas:</b> {selectedItem.kelas}</p>
              <p><b>Keluhan:</b> {selectedItem.keluhan}</p>
              <p><b>Tanggal & Waktu:</b> {selectedItem.tanggal}</p>
              <p><b>Penanganan:</b> {selectedItem.penanganan}</p>
              <div>
                <b>Status:</b>
                <div className="mt-1.5">
                  <span
                    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full font-semibold ${getStatusStyle(
                      selectedItem.status
                    )}`}
                  >
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${getStatusDot(
                        selectedItem.status
                      )}`}
                    />
                    {selectedItem.status.trim()}
                  </span>
                </div>
              </div>
            </div>

            {/* Tombol Cetak Surat khusus Dipulangkan & Rujukan RS */}
            {["Dipulangkan", "Rujukan RS"].includes(selectedItem.status.trim()) && (
              <div className="mt-5 pt-4 border-t">
                <button
                  onClick={() => generateSuratPDF(selectedItem)}
                  className="w-full bg-[#0D2840] text-white px-4 py-2.5 rounded-xl text-xs font-bold hover:bg-slate-800 transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z" />
                  </svg>
                  Cetak Surat {selectedItem.status.trim() === "Dipulangkan" ? "Izin Pulang" : "Rujukan"}
                </button>
              </div>
            )}

            <button
              onClick={() => setShowDetailModal(false)}
              className="w-full mt-3 border border-gray-400 px-4 py-2.5 rounded-xl text-xs font-bold text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              Tutup
            </button>
          </div>
        </div>
      )}

      {/* MODAL EDIT */}
      {showEditModal && selectedEditItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-5 sm:p-6 rounded-2xl w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center border-b pb-3 mb-4">
              <h2 className="text-lg sm:text-xl font-bold text-black">Edit Status Siswa</h2>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-500 text-xl p-1 font-bold"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              <div className="text-xs sm:text-sm text-black">
                <p><b>Nama:</b> {selectedEditItem.nama}</p>
                <p className="mt-1"><b>Kelas:</b> {selectedEditItem.kelas}</p>
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-bold text-black mb-2">
                  Ubah Status
                </label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-3 sm:px-4 py-2.5 text-xs sm:text-sm text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  {STATUS_OPTIONS.map((status) => (
                    <option key={status} value={status}>
                      {status.trim()}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6 border-t pt-4">
              <button
                onClick={() => setShowEditModal(false)}
                disabled={savingStatus}
                className="border border-gray-400 px-4 py-2 rounded-xl text-xs font-bold text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={updateStatus}
                disabled={savingStatus}
                className="bg-[#3B91FF] text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-blue-600 disabled:opacity-50 cursor-pointer"
              >
                {savingStatus ? "Menyimpan..." : "Simpan Perubahan"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL EXPORT */}
      {showExportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border border-gray-200 max-h-[90vh] overflow-y-auto">
            <div className="bg-[#0B3A60] px-5 py-4 flex justify-between items-center text-white">
              <div className="flex items-center gap-2 font-bold text-base sm:text-lg">
                <span>
                  gridas<span className="text-red-500">Care</span>
                </span>
              </div>
              <button
                onClick={() => setShowExportModal(false)}
                className="text-xs sm:text-sm font-semibold cursor-pointer p-1"
              >
                Tutup
              </button>
            </div>
            <div className="p-5 sm:p-6">
              <h3 className="font-bold text-black text-base sm:text-lg mb-4">
                Pilih Format Export Laporan
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6">
                <div
                  onClick={() => setExportFormat("pdf")}
                  className={`border-2 rounded-2xl p-4 sm:p-5 flex flex-col items-center justify-center cursor-pointer transition ${exportFormat === "pdf"
                    ? "border-red-500 bg-red-50/60 shadow-sm"
                    : "border-gray-200 hover:border-gray-300"
                    }`}
                >
                  <svg className="w-10 h-12 mb-2" viewBox="0 0 384 512" fill="none">
                    <path d="M224 136V0H24C10.7 0 0 10.7 0 24V488C0 501.3 10.7 512 24 512H360C373.3 512 384 501.3 384 488V160H248C234.7 160 224 149.3 224 136Z" fill="#1A5CFF" />
                    <path d="M377 105L279 7C273 1 265 0 256 0V128H384C384 119 383 111 377 105Z" fill="#93C5FD" />
                    <text x="192" y="360" fill="white" fontSize="110" fontWeight="bold" textAnchor="middle">PDF</text>
                  </svg>

                  <span className="font-bold text-xs sm:text-sm text-gray-800">
                    Cetak Laporan Rapi
                  </span>
                  <span className="text-xs text-red-500 font-semibold">(PDF)</span>
                </div>

                <div
                  onClick={() => setExportFormat("excel")}
                  className={`border-2 rounded-2xl p-4 sm:p-5 flex flex-col items-center justify-center cursor-pointer transition ${exportFormat === "excel"
                    ? "border-green-600 bg-green-50/60 shadow-sm"
                    : "border-gray-200 hover:border-gray-300"
                    }`}
                >
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-2">
                    <path fillRule="evenodd" clipRule="evenodd" d="M9.57031 0H24L36 12V34.7926C36 37.6712 33.5088 40 30.4403 40H9.57031C6.49114 40 4 37.6712 4 34.7926V5.20738C3.99995 2.32883 6.49108 0 9.57031 0Z" fill="#079455" />
                    <path d="M24 8.16406V0L36 12H28.0171C24.4248 12 24 9.47141 24 8.16406Z" fill="white" fillOpacity="0.3" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M17.5381 18.2857C16.1393 18.2857 15.5227 18.4089 14.8968 18.7436C14.3395 19.0417 13.8988 19.4824 13.6008 20.0397C13.266 20.6656 13.1428 21.2822 13.1428 22.6809V25.319C13.1428 26.7178 13.266 27.3344 13.6008 27.9603C13.8988 28.5176 14.3395 28.9583 14.8968 29.2563C15.5227 29.5911 16.1393 29.7143 17.5381 29.7143H22.4619C23.8606 29.7143 24.4772 29.5911 25.1031 29.2563C25.6604 28.9583 26.1011 28.5176 26.3992 27.9603C26.7339 27.3344 26.8571 26.7178 26.8571 25.319V22.6809C26.8571 21.2822 26.7339 20.6656 26.3992 20.0397C26.1011 19.4824 25.6604 19.0417 25.1031 18.7436C24.4772 18.4089 23.8606 18.2857 22.4619 18.2857H17.5381ZM15.4358 19.7514C15.8133 19.5495 16.2038 19.4286 17.5381 19.4286H19.4285V21.7143H14.3169C14.365 21.1149 14.4669 20.8436 14.6086 20.5787C14.8001 20.2206 15.0777 19.9429 15.4358 19.7514ZM19.4285 22.8571H14.2857V25.1428H19.4285V22.8571ZM20.5714 25.1428V22.8571H25.7143V25.1428H20.5714ZM19.4285 26.2857H14.3169C14.365 26.8851 14.4669 27.1564 14.6086 27.4213C14.8001 27.7794 15.0777 28.057 15.4358 28.2485C15.8133 28.4505 16.2038 28.5714 17.5381 28.5714H19.4285V26.2857ZM20.5714 28.5714V26.2857H25.683C25.6349 26.8851 25.5331 27.1564 25.3914 27.4213C25.1999 27.7794 24.9223 28.057 24.5642 28.2485C24.1866 28.4505 23.7961 28.5714 22.4619 28.5714H20.5714ZM20.5714 21.7143V19.4286H22.4619C23.7961 19.4286 24.1866 19.5495 24.5642 19.7514C24.9223 19.9429 25.1999 20.2206 25.3914 20.5787C25.5331 20.8436 25.6349 21.1149 25.683 21.7143H20.5714Z" fill="white" />
                  </svg>

                  <span className="font-bold text-xs sm:text-sm text-gray-800">
                    Data Mentah
                  </span>
                  <span className="text-xs text-green-600 font-semibold">
                    (Excel .xlsx)
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Tanggal Mulai
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full border border-gray-300 rounded-xl px-3 py-2 text-xs text-black"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Tanggal Selesai
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full border border-gray-300 rounded-xl px-3 py-2 text-xs text-black"
                  />
                </div>
              </div>

              <div className="flex flex-col-reverse sm:flex-row justify-end items-stretch sm:items-center gap-2 sm:gap-4">
                <button
                  onClick={() => setShowExportModal(false)}
                  className="border border-gray-800 text-gray-800 px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm cursor-pointer hover:bg-gray-100 transition text-center"
                >
                  Batal
                </button>
                <button
                  onClick={handleExportSubmit}
                  className="bg-[#0B2545] text-white px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm cursor-pointer hover:bg-slate-800 transition text-center"
                >
                  Export Sekarang
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL HAPUS */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white w-full max-w-sm sm:max-w-md rounded-2xl p-6 sm:p-8 border border-gray-300 shadow-2xl text-center">
            <h3 className="text-base sm:text-lg font-bold text-black mb-6">
              Apakah kamu yakin ingin menghapus data ini?
            </h3>
            <div className="flex justify-center items-center gap-4">
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white font-bold px-6 sm:px-8 py-2 rounded-lg hover:bg-red-600 text-xs sm:text-sm cursor-pointer"
              >
                Ya
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-white text-black font-bold px-6 sm:px-8 py-2 rounded-lg border border-gray-800 hover:bg-gray-100 text-xs sm:text-sm cursor-pointer"
              >
                Tidak
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}