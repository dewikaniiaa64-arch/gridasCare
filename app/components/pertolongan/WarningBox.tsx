import { Info } from "lucide-react";

export default function WarningBox() {
  return (
    <section className="bg-[#D7ECFF] py-10">
      <div className="max-w-6xl mx-auto px-6">

        <div className="bg-[#EAF5FF] rounded-2xl shadow-md px-8 py-6 flex items-center gap-6">

          {/* Icon */}
          <div className="flex-shrink-0">
            <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center">
              <Info size={36} className="text-white" />
            </div>
          </div>

          {/* Text */}
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-blue-700">
              INGAT!
            </h2>

            <p className="2C4153 mt-2">
              Pertolongan pertama bukan pengganti penanganan medis
              profesional. Segera cari bantuan medis jika kondisi
              korban tidak membaik.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}