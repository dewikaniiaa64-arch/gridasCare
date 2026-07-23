import Image from "next/image";

export default function HeroPertolongan() {
  return (
    <section className="bg-gradient-to-r from-sky-100 to-white">
      <div className="max-w-7xl mx-auto px-10 py-12 flex items-center justify-between">

        {/* Kiri */}
        <div className="max-w-xl">
          <h1 className="text-5xl font-bold text-slate-700">
            Pertolongan Pertama
          </h1>

          <p className="mt-4 text-gray-600 leading-7">
            Informasi dan panduan mengenai pertolongan pertama untuk
            berbagai kondisi darurat. Lakukan pertolongan dengan
            tenang dan tetap lakukan keselamatan.
          </p>
        </div>

        {/* Kanan */}
        <Image
          src="/images/firstaid.png"
          alt="First Aid"
          width={300}
          height={220}
          priority
        />

      </div>
    </section>
  );
}