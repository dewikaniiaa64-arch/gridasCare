export default function CatatanBox() {
  return (
    <section className="py-6">
      <div className="max-w-7xl mx-auto px-8">
        <div className="bg-[#DDEEFF] rounded-2xl shadow-sm px-6 py-4 flex items-center gap-5">
          {/* Text */}
          <div>
            <h2 className="text-[#4B7CFF] rounded-2xl font-bold mb-2">
              Catatan
            </h2>

            <p className="text-gray-700 text-sm leading-5 mt-1">
              Obat yang tersedia di UKS hanya untuk pertolongan pertama dan luka ringan.
              <br/>
              Jika keluhan tidak membaik, segera konsultasikan dengan petugas UKS atau tenaga medis.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}