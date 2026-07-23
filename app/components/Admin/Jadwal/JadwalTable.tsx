import { JadwalItem } from "@/app/admin/jadwal/page";

type Props = {
  data: JadwalItem[];
  onDelete: (id: string) => void;
  onEdit: (item: JadwalItem) => void;
};

export default function JadwalTable({ data, onDelete, onEdit }: Props) {
  return (
    <table className="w-full text-left border-collapse text-sm">
      <thead>
        <tr className="bg-slate-100 border-b text-gray-600">
          <th className="p-3 font-semibold">Hari</th>
          <th className="p-3 font-semibold">Jam</th>
          <th className="p-3 font-semibold">Nama</th>
          <th className="p-3 font-semibold">Jabatan</th>
          <th className="p-3 text-center font-semibold">Aksi</th>
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan={5} className="text-center p-6 italic text-gray-400 bg-white">
              Belum ada data jadwal piket aktif.
            </td>
          </tr>
        ) : (
          data.map((item) => (
            <tr key={item.id} className="border-b hover:bg-slate-50 transition bg-white">
              <td className="p-3 font-medium text-blue-900">{item.hari}</td>
              <td className="p-3 text-gray-700">{item.jam}</td>
              <td className="p-3 font-semibold text-gray-900">{item.nama}</td>
              <td className="p-3">
                <span className="bg-blue-100 text-blue-800 text-xs px-2.5 py-1 rounded-full font-medium">
                  {item.jabatan}
                </span>
              </td>
              <td className="p-3 text-center">
                <div className="flex justify-center gap-2">
                  <button 
                    onClick={() => onEdit(item)} 
                    className="bg-amber-500 text-white px-3 py-1 rounded hover:bg-amber-600 text-xs font-semibold transition"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => onDelete(item.id)} 
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-xs font-semibold transition"
                  >
                    Hapus
                  </button>
                </div>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}