import Image from "next/image";
import { jadwalData } from "./jadwalData";
import {
  CalendarDays,
  Clock3,
  CircleUserRound,
} from "lucide-react";

type JadwalItem = {
  jam: string;
  nama: string;
  jabatan: string;
};

type Props = {
  hari: string;
};

export default function JadwalCard({ hari }: Props) {
  const data = jadwalData[hari as keyof typeof jadwalData];

  return (
    <div className="w-[190px] rounded-[22px] overflow-hidden shadow-lg bg-[#8FC3F7]">

      {/* Header */}
      <div className="relative bg-[#243B77] h-10 flex items-center justify-center rounded-t-[22px]">

  {/* Icon di kiri */}
  <CalendarDays
    size={20}
    className="absolute left-4 text-white"
  />

  {/* Hari tetap di tengah */}
  <span className="text-white font-bold text-[18px]">
    {hari}
  </span>

</div>

      {/* Isi */}
      <div>
        {data.map((item, index) => (
          <div
            key={index}
            className="px-3 py-2 border-b border-[#74A9E8] last:border-none"
          >
            {/* Jam */}
            <div className="flex items-center gap-2 text-white text-[12px] font-medium">
              <Clock3 size={14} className="text-white" />
              {item.jam}
            </div>

            {/* Nama */}
            <div className="flex gap-3 mt-1 items-start">

              <Image
  src="/images/icon1.png"
  alt="Icon"
  width={50}
  height={50}
  className="flex-shrink-0"
/>

              <div>
                <h3 className="text-white text-[13px] font-semibold leading-4">
                  {item.nama}
                </h3>

                <p className="text-white/90 text-[12px] mt-1">
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