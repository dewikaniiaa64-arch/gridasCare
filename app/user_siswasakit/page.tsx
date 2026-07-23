export default function Home() {
  return (
    <main className="min-h-screen bg-[#EAF5FF] flex items-center justify-center p-10">

      <div className="bg-white rounded-2xl shadow-lg w-full max-w-3xl p-8">

        <h1 className="text-3xl font-bold text-center text-[#2C4153] mb-8">
          Data Siswa Sakit
        </h1>

        <form className="space-y-5">

          <div>
            <label className="block mb-2">Tanggal</label>
            <input
              type="date"
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2">Nama</label>
            <input
              type="text"
              placeholder="Masukkan nama"
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2">Kelas</label>
            <input
              type="text"
              placeholder="Masukkan kelas"
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2">Keluhan</label>
            <textarea
              className="w-full border rounded-lg p-3"
              rows={4}
            />
          </div>

          <div>
            <label className="block mb-2">Penanganan Awal</label>
            <textarea
              className="w-full border rounded-lg p-3"
              rows={4}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#2C4153] text-white py-3 rounded-lg hover:bg-[#203240]"
          >
            Simpan
          </button>

        </form>

      </div>

    </main>
  );
}