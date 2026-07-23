import JadwalCard from "./JadwalCard";

export default function JadwalList() {
  // Contoh data dummy sesuaikan dengan state/data aslimu
  const hariList = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"];

  return (
    // grid-cols-1 untuk HP, md:grid-cols-5 agar membagi rata 5 kolom di layar laptop
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-start w-full">
      {hariList.map((hari) => (
        <JadwalCard key={hari} hari={hari} jadwal={[]} />
      ))}
    </div>
  );
}