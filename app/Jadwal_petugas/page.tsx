import HeroJadwal from "@/app/components/Jadwal_petugas_user/HeroJadwal";
import JadwalList from "@/app/components/Jadwal_petugas_user/JadwalList";

export default function JadwalUserPage() {
  return (
    // Gunakan gradasi linear dari biru muda ke biru yang sedikit lebih cerah sesuai desain
    <main
  className="min-h-screen flex flex-col justify-between bg-cover bg-center bg-no-repeat"
  style={{
    backgroundImage: "url('/images/background.jpeg')",
  }}
>
      <div className="container mx-auto px-6 py-12 flex-1 flex flex-col justify-center">
        {/* HeroJadwal berisi judul dan gambar papan klip */}
        <HeroJadwal />
        
        {/* JadwalList berisi grid kartu-kartu hari */}
        <div className="mt-8">
          <JadwalList />
        </div>
      </div>

    </main>
  );
}