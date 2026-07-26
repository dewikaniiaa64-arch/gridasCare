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
    <div className="bg-white rounded-[22px] shadow-md hover:shadow-lg transition duration-300 hover:-translate-y-1 border border-gray-200">
      {/* Gambar */}
      <div className="flex justify-center pt-4">
        <div className="w-24 h-24 rounded-full bg-[#EAF4FF] flex items-center justify-center mx-auto mt-5">
         <Image
  src={image}
  alt={title}
  width={100}
  height={100}
  className="object-contain"
/>
        </div>
      </div>

      {/* Isi */}
     <div className="px-5 pt-3 pb-4 flex flex-col h-[170px]">

        {/* Judul */}
        <h2 className="text-[17px] font-bold text-center text-gray-900 leading-tight">
  {title}
</h2>

        {/* Deskripsi */}
        <p className="text-[13px] text-gray-600 text-center mt-2 leading-5 min-h-[55px]">
  {description}
</p>

        {/* Bagian bawah */}
        <div className="mt-auto">
          <hr className="my-3 border-gray-300" />

          <button
  onClick={onClick}
  className="w-full flex justify-center items-center gap-2 text-[#2563EB] font-semibold text-[15px] hover:text-gray-700 transition"
>
  <span>Lihat Panduan</span>
  <span className="text-lg">→</span>
</button>
        </div>

      </div>

    </div>
  );
}