import { Info } from "lucide-react";

export default function WarningBox() {
  return (
    <section className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="bg-[#DDEEFF] rounded-2xl shadow-sm px-5 sm:px-6 py-4 flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5">

          {/* Icon */}
          <div className="w-12 h-12 rounded-full border-[3px] border-[#0F4D9E] flex items-center justify-center flex-shrink-0">
            <Info size={24} className="text-[#0F4D9E]" strokeWidth={3} />
          </div>

          {/* Text */}
          <div className="text-center sm:text-left">
            <h2 className="text-[#0F4D9E] text-xl sm:text-2xl font-extrabold">
              INGAT!
            </h2>

            <p className="text-gray-700 text-sm leading-6 mt-2">
              Pertolongan pertama bukan pengganti penanganan medis profesional.
              Segera cari bantuan medis jika kondisi korban tidak membaik.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}