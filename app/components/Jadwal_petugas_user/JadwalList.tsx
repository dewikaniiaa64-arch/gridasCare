import JadwalCard from "./JadwalCard";

const hari = [
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jumat",
];

export default function JadwalList() {
  return (
    <section className="relative z-20">

      <div
        className="
        grid
        grid-cols-5
        gap-6
        justify-items-center
        "
      >
        {hari.map((item) => (
          <JadwalCard
            key={item}
            hari={item}
          />
        ))}
      </div>

    </section>
  );
}