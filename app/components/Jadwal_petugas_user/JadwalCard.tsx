import Image from "next/image";
import { jadwalData } from "./jadwalData";
import {
  CalendarDays,
  Clock3,
} from "lucide-react";

type Props = {
  hari: string;
};

export default function JadwalCard({ hari }: Props) {
  const data = jadwalData[hari as keyof typeof jadwalData];

  return (
    <div className="w-full max-w-[260px] rounded-[22px] overflow-hidden shadow-lg bg-[#8FC3F7]">

      {/* Header */}
      <div className="relative bg-[#243B77] h-10 flex items-center justify-center rounded-t-[22px]">

        <CalendarDays
          size={18}
          className="absolute left-4 text-white"
        />

        <span className="text-white font-bold text-base lg:text-[18px]">
          {hari}
        </span>

      </div>

      {/* Isi */}
      <div>
        {data.map((item, index) => (
          <div
            key={index}
            className="px-3 py-3 border-b border-[#74A9E8] last:border-none"
          >
            {/* Jam */}
            <div className="flex items-center gap-2 text-white text-xs lg:text-[12px] font-medium">
              <Clock3 size={14} className="text-white flex-shrink-0" />
              <span>{item.jam}</span>
            </div>

            {/* Nama */}
            <div className="flex gap-3 mt-2 items-start">

              <Image
                src="/images/icon1.png"
                alt="Icon"
                width={50}
                height={50}
                className="w-10 h-10 lg:w-12 lg:h-12 rounded-full flex-shrink-0"
              />

              <div className="min-w-0 flex-1">
                <h3 className="text-white text-sm lg:text-[13px] font-semibold leading-5 break-words">
                  {item.nama}
                </h3>

                <p className="text-white/90 text-xs lg:text-[12px] mt-1 break-words">
                  {item.jabatan}
                </p>
              </div>

            </div>

          </div>
        ))}
      </div>

    </div>
  );
}