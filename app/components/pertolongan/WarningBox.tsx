import { Info } from "lucide-react";

export default function WarningBox() {
  return (
    <section className="py-6">
      <div className="max-w-7xl mx-auto px-8">

        <div className="bg-[#DDEEFF] rounded-2xl shadow-sm px-6 py-4 flex items-center gap-5">

          {/* Icon */}
          <div className="w-12 h-12 rounded-full border-[3px] border-[#0F4D9E] flex items-center justify-center flex-shrink-0">
            <Info size={24} className="text-[#0F4D9E]" strokeWidth={3} />
          </div>

          {/* Text */}
          <div>
            <h2 className="text-[#0F4D9E] text-2xl font-extrabold">
              INGAT!
            </h2>

            <p className="text-gray-700 text-sm leading-5 mt-1">
              Pertolongan pertama bukan pengganti penanganan medis profesional.
              Segera cari bantuan medis jika kondisi korban tidak membaik.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}