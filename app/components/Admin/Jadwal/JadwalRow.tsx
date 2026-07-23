type Props = {
  no: number;
  hari: string;
  jam: string;
  nama: string;
  jabatan: string;
};

export default function JadwalRow({
  no,
  hari,
  jam,
  nama,
  jabatan,
}: Props) {
  return (
    <tr className="text-center border">

      <td>{no}</td>
      <td>{hari}</td>
      <td>{jam}</td>
      <td>{nama}</td>
      <td>{jabatan}</td>

      <td className="space-x-2">

        <button className="bg-yellow-400 px-2 rounded">
          Edit
        </button>

        <button className="bg-red-500 text-white px-2 rounded">
          Hapus
        </button>

      </td>

    </tr>
  );
}