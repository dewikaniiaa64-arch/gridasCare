import Link from 'next/link';

export default function Home() {
  const menuItems = [
    { 
      title: "Jadwal Petugas", 
      desc: "Lihat jadwal piket dan tugas petugas kesehatan sekolah.", 
      path: "/Jadwal_petugas" 
    },
    { 
      title: "Siswa Sakit", 
      desc: "Laporkan kondisi siswa sakit dan lakukan pencatatan.", 
      path: "/user_siswasakit" 
    },
    { 
      title: "Pertolongan Pertama", 
      desc: "Panduan P3K untuk penanganan cedera dan keadaan darurat.", 
      path: "/pertolongan" 
    },
    { 
      title: "Obat-Obatan", 
      desc: "Informasi obat-obatan yang tersedia di UKS sekolah.", 
      path: "/obat-obatan" 
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* 1. Hero Section dengan background bc.png */}
      <section 
        className="relative py-20 px-16 flex items-center justify-between bg-cover bg-center min-h-[400px]"
  style={{ backgroundImage: "url('images/bc.png')" }}
      >
        {/* Overlay agar teks tetap terbaca di atas gambar */}
        <div className="absolute inset-0 bg-blue-500/20"></div>

        <div className="relative z-10 max-w-xl">
          <h1 className="text-5xl font-extrabold text-[#0A405A] mb-4 leading-tight">
  Welcome to <br /> 
  {/* Mengubah warna di sini */}
  <span className="text-white">Gridas</span>
  <span className="text-red-500">Care</span> <br /> 
  SMK Negeri 2
</h1>
          <p className="text-gray-700 mb-8 max-w-md bg-white/60 p-4 rounded-lg backdrop-blur-sm">
            GridasCare hadir untuk mewujudkan lingkungan sekolah yang sehat, aman, dan siap membantu.
          </p>
          <Link 
            href="#menu-section" 
            className="bg-[#0A405A] text-white px-8 py-3 rounded-full hover:bg-gray-700 transition shadow-lg inline-block"
          >
            Lihat Informasi →
          </Link>
        </div>
        
        {/* Ikon P3K */}
        <div className="relative z-10 w-72 h-72 bg-white rounded-full flex items-center justify-center border-[12px] border-red-500 shadow-xl">
           <span className="text-red-500 text-[180px] font-bold leading-none">+</span>
        </div>
      </section>

      {/* 2. Grid Menu Section */}
      <section id="menu-section" className="py-16 px-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {menuItems.map((menu) => (
            <Link href={menu.path} key={menu.title} className="block transition-transform duration-200 hover:-translate-y-2">
              <div className="bg-white p-8 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] text-center hover:shadow-2xl border border-gray-100 flex flex-col items-center h-full cursor-pointer">
                <div className="text-5xl mb-6">🏥</div> 
                <h3 className="font-bold text-xl mb-3 text-gray-800">{menu.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{menu.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}