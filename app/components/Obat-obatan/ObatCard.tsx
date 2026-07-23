import Image from "next/image";

interface ObatCardProps {
  nama: string;
  fungsi: string;
  gambar: string;
}

export default function ObatCard({
  nama,
  fungsi,
  gambar,
}: ObatCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-5 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">

      <div className="flex justify-center">
        <Image
          src={gambar}
          alt={nama}
          width={100}
          height={100}
        />
      </div>

      <h2 className="text-xl font-bold text-center mt-4 text-blue-700">
        {nama}
      </h2>

      <p className="text-center text-gray-600 mt-2">
        {fungsi}
      </p>

    </div>
  );
}