import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-[#E6F3FF]">
      {/* Sidebar - Bagian kiri */}
      <aside className="w-64 bg-white p-6 shadow-md">
        <h1 className="text-2xl font-bold text-red-600 mb-10">gridasCare</h1>
        <nav className="space-y-4">
          <Link href="/dashboard" className="block p-3 bg-gray-800 text-white rounded-xl font-bold">
            Siswa Sakit
          </Link>S
          <Link href="/jadwal" className="block p-3 text-gray-600 hover:bg-blue-50 rounded-xl font-bold">
            Jadwal Petugas
          </Link>
        </nav>
      </aside>

      {/* Area Konten - Bagian kanan */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="bg-white p-6 rounded-3xl shadow-sm min-h-full">
          {children}
        </div>
      </main>
    </div>
  );
}