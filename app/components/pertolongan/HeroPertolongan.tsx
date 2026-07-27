import Image from "next/image";

export default function HeroPertolongan() {
  return (
    <section className="bg-transparent">
      <div className="max-w-7xl mx-auto px-8 py-6">

        <div className="flex items-center justify-between">

          {/* Kiri */}
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold text-[#0A405A] mb-4">
              Pertolongan Pertama
            </h1>

            <p className="text-gray-700 mb-8 max-w-md text-sm md:text-base">
              Informasi dan panduan mengenai pertolongan pertama untuk berbagai 
              kondisi darurat. 
              Lakukan pertolongan dengan tenang dan tetap lakukan keselamatan.
            </p>
          </div>

          {/* Kanan */}
          <Image
            src="/images/obat.png"
            alt="First Aid"
            width={260}
            height={220}
            className="object-contain"
            priority
          />

        </div>

      </div>
    </section>
  );
}