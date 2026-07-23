import ObatCard from "@/app/components/Obat-obatan/ObatCard";

const obatList = [
  {
    nama: "Paracetamol",
    fungsi: "Meredakan demam dan nyeri ringan.",
    gambar: "/images/paracetamol.png",
  },
  {
    nama: "Betadine",
    fungsi: "Membersihkan luka dan mencegah infeksi.",
    gambar: "/images/betadine.png",
  },
  {
    nama: "Plester",
    fungsi: "Menutup luka kecil agar tetap bersih.",
    gambar: "/images/plester.png",
  },
  {
    nama: "Perban",
    fungsi: "Membalut luka atau bagian tubuh yang cedera.",
    gambar: "/images/perban.png",
  },
  {
    nama: "Paracetamol",
    fungsi: "Meredakan demam dan nyeri ringan.",
    gambar: "/images/paracetamol.png",
  },
  {
    nama: "Betadine",
    fungsi: "Membersihkan luka dan mencegah infeksi.",
    gambar: "/images/betadine.png",
  },
  {
    nama: "Plester",
    fungsi: "Menutup luka kecil agar tetap bersih.",
    gambar: "/images/plester.png",
  },
  {
    nama: "Perban",
    fungsi: "Membalut luka atau bagian tubuh yang cedera.",
    gambar: "/images/perban.png",
  },
];

export default function ObatPage() {
  return (
    <main className="min-h-screen bg-sky-100 p-8">
      <h1 className="text-4xl font-bold text-center text-blue-700 mb-10">
        Obat-obatan
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {obatList.map((obat) => (
          <ObatCard
            key={obat.nama}
            nama={obat.nama}
            fungsi={obat.fungsi}
            gambar={obat.gambar}
          />
        ))}
      </div>
    </main>
  );
}