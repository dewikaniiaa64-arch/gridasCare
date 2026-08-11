import Image from "next/image";

export default function HeroJadwal() {
  return (
    <section className="relative min-h-[220px] lg:h-[260px]">
      {/* Container */}
      <div className="max-w-[1280px] h-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col-reverse lg:flex-row items-center justify-between py-6 lg:py-0">

        {/* Tulisan */}
        <div className="z-10 text-center lg:text-left">

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-sky-950 mb-3">
            Jadwal Piket UKS
          </h1>

          <p className="text-sky-950 max-w-md text-sm md:text-base mx-auto lg:mx-0">
            Berikut jadwal piket petugas setiap harinya
          </p>

        </div>

        {/* Gambar */}
        <div className="relative w-[180px] h-[150px] sm:w-[220px] sm:h-[180px] lg:w-[270px] lg:h-[220px] mb-6 lg:mb-0">

          <Image
            src="/images/jadwal.png"
            alt="Jadwal"
            fill
            priority
            className="object-contain"
          />

        </div>

      </div>

      {/* Background */}
      <div
        className="absolute inset-0 opacity-10 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/background.jpeg')",
        }}
      />
    </section>
  );
}