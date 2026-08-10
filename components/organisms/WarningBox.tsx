import { Info } from "lucide-react";

export default function WarningBox() {
  return (
    <section className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="bg-blue-200 rounded-2xl shadow-sm px-5 sm:px-6 py-4 flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5">

          <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 58 57"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M29.0002 9.5C18.3227 9.5 9.66683 18.0066 9.66683 28.5C9.66683 38.9934 18.3227 47.5 29.0002 47.5C39.6777 47.5 48.3335 38.9934 48.3335 28.5C48.3335 18.0066 39.6777 9.5 29.0002 9.5ZM4.8335 28.5C4.8335 15.3832 15.6533 4.75 29.0002 4.75C42.347 4.75 53.1668 15.3832 53.1668 28.5C53.1668 41.6168 42.347 52.25 29.0002 52.25C15.6533 52.25 4.8335 41.6168 4.8335 28.5ZM29.0002 26.125C30.3349 26.125 31.4168 27.1883 31.4168 28.5V38C31.4168 39.3117 30.3349 40.375 29.0002 40.375C27.6655 40.375 26.5835 39.3117 26.5835 38V28.5C26.5835 27.1883 27.6655 26.125 29.0002 26.125Z"
                fill="#0154B2"
              />
              <path
                d="M31.4168 19C31.4168 20.3117 30.3349 21.375 29.0002 21.375C27.6655 21.375 26.5835 20.3117 26.5835 19C26.5835 17.6883 27.6655 16.625 29.0002 16.625C30.3349 16.625 31.4168 17.6883 31.4168 19Z"
                fill="#0154B2"
              />
            </svg>
          </div>
          {/* Text */}
          <div className="text-center sm:text-left">
            <h2 className="text-[#0F4D9E] text-xl sm:text-2xl font-extrabold">
              INGAT!
            </h2>

            <p className="text-black text-sm leading-6 mt-2 font-semibold">
              Pertolongan pertama bukan pengganti penanganan medis profesional.<br />
              Segera cari bantuan medis jika kondisi korban tidak membaik.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}