type Props = {
  jam: string;
  nama: string;
  jabatan: string;
};

export default function JadwalItem({
  jam,
  nama,
  jabatan,
}: Props) {
  return (
    <div className="border-b py-3">

      <p className="text-sm">{jam}</p>

      <h3 className="font-semibold">
        {nama}
      </h3>

      <p>{jabatan}</p>

    </div>
  );
}