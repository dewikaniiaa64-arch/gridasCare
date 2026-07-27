import HeroJadwal from "@/app/components/Jadwal_petugas_user/HeroJadwal";
import JadwalList from "@/app/components/Jadwal_petugas_user/JadwalList";

export default function JadwalUserPage() {
  return (
    <main
  className="min-h-screen bg-cover bg-no-repeat"
  style={{
    backgroundImage: "url('/images/bc.png')",
  }}
>
  <HeroJadwal />

  <section className="-mt-2 relative z-10 pb-20">
    <div className="max-w-[1450px] mx-auto px-6">
      <JadwalList />
    </div>
  </section>
</main>
  );
}