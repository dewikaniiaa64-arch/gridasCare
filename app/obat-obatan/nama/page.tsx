import Image from "next/image";
import Link from "next/link";

const dataObat = {
  paracetamol: {
    nama: "Paracetamol",
    gambar: "/images/paracetamol.png",
    fungsi: "Meredakan demam dan nyeri ringan hingga sedang.",
    aturan: "Gunakan sesuai dosis yang dianjurkan pada kemasan atau petunjuk tenaga kesehatan.",
    peringatan: "Jangan melebihi dosis yang dianjurkan.",
  },

  betadine: {
    nama: "Betadine",
    gambar: "/images/betadine.png",
    fungsi: "Membersihkan luka dan membantu mencegah infeksi.",
    aturan: "Oleskan tipis pada luka yang telah dibersihkan.",
    peringatan: "Hanya untuk pemakaian luar.",
  },

  plester: {
    nama: "Plester",
    gambar: "/images/plester.png",
    fungsi: "Menutup luka kecil agar tetap bersih.",
    aturan: "Ganti plester setiap hari atau saat kotor.",
    peringatan: "Jangan digunakan pada luka yang dalam.",
  },

  perban: {
    nama: "Perban",
    gambar: "/images/perban.png",
    fungsi: "Membalut luka atau bagian tubuh yang cedera.",
    aturan: "Balut secukupnya, jangan terlalu kencang.",
    peringatan: "Jika terasa kesemutan segera longgarkan.",
  },
};

export default async function DetailObat({
  params,
}: {
  params: Promise<{ nama: string }>;
}) {
  const { nama } = await params;

  const obat =
    dataObat[nama as keyof typeof dataObat];

  if (!obat) {
    return (
      <h1 className="text-center text-3xl mt-20">
        Obat tidak ditemukan
      </h1>
    );
  }

  return (
    <main className="min-h-screen bg-sky-100">

      <div className="bg-sky-500 py-5 text-white text-center text-3xl font-bold">
        Detail Obat
      </div>

      <div className="max-w-3xl mx-auto mt-10 bg-white rounded-2xl shadow-lg p-8">

        <div className="flex justify-center">

          <Image
            src={obat.gambar}
            alt={obat.nama}
            width={180}
            height={180}
          />

        </div>

        <h1 className="text-3xl font-bold text-center mt-6 text-blue-700">
          {obat.nama}
        </h1>

        <div className="mt-8 space-y-5">

          <div>
            <h2 className="font-bold">Fungsi</h2>
            <p>{obat.fungsi}</p>
          </div>

          <div>
            <h2 className="font-bold">Aturan Pakai</h2>
            <p>{obat.aturan}</p>
          </div>

          <div>
            <h2 className="font-bold">Peringatan</h2>
            <p>{obat.peringatan}</p>
          </div>

        </div>

        <div className="mt-10 flex justify-center">

          <Link
            href="/obat"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
          >
            Kembali
          </Link>

        </div>

      </div>

    </main>
  );
}