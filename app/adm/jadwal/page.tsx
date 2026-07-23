export default function DashboardPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Data Siswa Sakit</h2>
        <button className="bg-gray-800 text-white px-4 py-2 rounded-lg">Simpan</button>
      </div>

      <input className="border p-2 rounded w-full mb-4" placeholder="Cari..." />

      <table className="w-full border text-sm">
        <thead className="bg-blue-50">
          <tr>
            <th className="p-2 border">No</th>
            <th className="p-2 border">Nama</th>
            <th className="p-2 border">Keluhan</th>
            <th className="p-2 border">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-2 border">1</td>
            <td className="p-2 border">Ayrani Azka.M</td>
            <td className="p-2 border">Pusing</td>
            <td className="p-2 border text-center">✏️ 🗑️</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}