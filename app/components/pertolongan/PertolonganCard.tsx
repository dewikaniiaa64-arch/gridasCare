import React from "react";

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
    <div
      onClick={onClick}
      className="bg-white rounded-3xl p-6 border border-gray-100 shadow-md hover:shadow-xl transition duration-300 cursor-pointer flex flex-col items-center text-center justify-between h-full"
    >
      {/* Container Gambar Bulat */}
      <div className="w-28 h-28 rounded-full bg-slate-100 flex items-center justify-center p-3 mb-4 shrink-0">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Judul dan Deskripsi */}
      <div className="flex-1 flex flex-col justify-start">
        <h3 className="font-bold text-lg text-gray-800 mb-2">{title}</h3>
        <p className="text-xs text-gray-500 leading-relaxed max-w-[200px] mx-auto">
          {description}
        </p>
      </div>

      {/* Tombol Lihat Panduan di Bawah */}
      <div className="mt-6 pt-2 border-t border-gray-100 w-full">
        <span className="text-blue-600 font-semibold text-sm hover:underline inline-flex items-center justify-center gap-1">
          Lihat Panduan <span className="text-base">→</span>
        </span>
      </div>
    </div>
  );
}