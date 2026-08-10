export default function CatatanBox() {
  return (
    <section className="py-6">
      <div className="max-w-7xl mx-auto px-8">
        <div className="bg-blue-200 rounded-2xl shadow-sm px-6 py-4 flex items-center gap-5">
          {/* Text */}
          <div>
            <h2 className="text-blue-500 rounded-2xl font-bold mb-2">
              Catatan
            </h2>

            <p className="text-sky-950 text-sm leading-5 mt-1 font-semibold">
              Obat yang tersedia di UKS hanya untuk pertolongan pertama dan luka ringan.
              <br />
              Jika keluhan tidak membaik, segera konsultasikan dengan petugas UKS atau tenaga medis.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}