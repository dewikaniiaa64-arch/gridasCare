import Image from "next/image";

export default function HeroJadwal() {
  return (
    <section>
      <div className="max-w-7xl mx-auto flex items-center justify-between px-12 py-16">
        
        {/* Kiri */}
        <div>
          <h1 className="text-5xl font-bold text-[#2C4153]">
            Jadwal Piket UKS
          </h1>

          <p className="mt-2 text-xl text-[#2C4153]">
            Berikut jadwal piket petugas setiap harinya
          </p>
        </div>

        {/* Kanan */}
        <Image
          src="/images/jadwal.png"
          alt="Jadwal"
          width={220}
          height={220}
        />
      </div>
    </section>
  );
}