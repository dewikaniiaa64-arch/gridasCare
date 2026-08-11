import Image from "next/image";

export default function HeroPertolongan() {
  return (
    <section className="bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-8">

          {/* Kiri */}
          <div className="max-w-2xl text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0A405A] mb-4">
              Pertolongan Pertama
            </h1>

            <p className="text-gray-700 max-w-md text-sm md:text-base mx-auto lg:mx-0">
              Informasi dan panduan mengenai pertolongan pertama untuk berbagai
              kondisi darurat. Lakukan pertolongan dengan tenang dan tetap
              lakukan keselamatan.
            </p>
          </div>

          {/* Kanan */}
          <div className="flex justify-center">
            <Image
              src="/images/obat.png"
              alt="First Aid"
              width={260}
              height={220}
              className="w-[180px] sm:w-[220px] lg:w-[260px] h-auto object-contain"
              priority
            />
          </div>

        </div>

      </div>
    </section>
  );
}