import Image from "next/image";

export default function HeroJadwal() {
  return (
    <section className="relative h-[260px]">
      {/* Container */}
      <div className="max-w-[1280px] h-full mx-auto px-8 flex items-center justify-between">

        {/* Tulisan */}
        <div className="z-10">

          <h1 className="text-5xl font-bold text-[#0A405A] mb-4">
            Jadwal Piket UKS
          </h1>

          <p className="text-gray-700 mb-8 max-w-md text-sm md:text-base">
            Berikut jadwal piket petugas setiap harinya
          </p>

        </div>

        {/* Gambar */}
        <div className="relative w-[270px] h-[220px]">

          <Image
            src="/images/jadwal.png"
            alt="Jadwal"
            fill
            priority
            className="object-contain"
          />

        </div>

      </div>

      {/* Background transparan (nanti bisa diganti gambar dekorasi) */}
      <div
        className="absolute inset-0 opacity-10 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/background.jpeg')",
        }}
      />
    </section>
  );
}