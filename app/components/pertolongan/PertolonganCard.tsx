import Image from "next/image";

interface PertolonganCardProps {
  title: string;
  description: string;
  image: string;
  onClick: () => void;
}

export default function PertolonganCard({
  title,
  description,
  image,
  onClick,
}: PertolonganCardProps) {
  return (
    <div className="bg-white rounded-3xl shadow-lg hover:shadow-xl transition duration-300 hover:-translate-y-2 border border-gray-200">

      {/* Gambar */}
      <div className="flex justify-center pt-6">
        <div className="w-28 h-28 rounded-full bg-blue-100 flex items-center justify-center">
          <Image
            src={image}
            alt={title}
            width={70}
            height={70}
          />
        </div>
      </div>

      {/* Isi */}
      <div className="px-5 pt-4 pb-5 flex flex-col h-[240px]">

        {/* Judul */}
        <h2
          className={`font-bold text-gray-800 leading-tight min-h-[56px] ${
            title === "Sengatan Serangga" ? "text-lg" : "text-[22px]"
          }`}
        >
          {title}
        </h2>

        {/* Deskripsi */}
        <p className="text-sm text-gray-500 mt-2 min-h-[72px]">
          {description}
        </p>

        {/* Bagian bawah */}
        <div className="mt-auto">
          <hr className="mb-3" />

          <button
            onClick={onClick}
            className="w-full flex justify-between items-center text-blue-600 font-semibold hover:text-blue-800"
          >
            <span>Lihat Panduan</span>
            <span className="text-xl">➜</span>
          </button>
        </div>

      </div>

    </div>
  );
}