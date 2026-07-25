import Image from "next/image";

export default function HeroJadwal() {
  return (
    <section className="relative h-[260px]">
      {/* Container */}
      <div className="max-w-[1280px] h-full mx-auto px-8 flex items-center justify-between">

        {/* Tulisan */}
        <div className="z-10">

          <h1 className="text-[56px] font-extrabold text-[#2D4765] leading-none">
            Jadwal Piket UKS
          </h1>

          <p className="mt-4 text-[22px] text-[#445E7B] font-medium">
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