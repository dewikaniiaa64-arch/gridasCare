import Link from 'next/link';

interface MenuItem {
  title: string;
  desc: string;
  path: string;
  imageSrc: string;
  lineColor: string;
}


export default function Home() {
  const menuItems: MenuItem[] = [
    {
      title: "Jadwal Petugas",
      desc: "Lihat jadwal piket dan tugas petugas kesehatan sekolah.",
      path: "/Jadwal_petugas",
      imageSrc: "/images/kalender.png",
      lineColor: "#79A0B4",
    },
    {
      title: "Siswa Sakit",
      desc: "Laporkan kondisi siswa sakit dan lakukan pencatatan.",
      path: "/user_siswasakit",
      imageSrc: "/images/sakit.png",
      lineColor: "#F52020",
    },
    {
      title: "Pertolongan Pertama",
      desc: "Panduan P3K untuk penanganan cedera dan keadaan darurat.",
      path: "/pertolongan",
      imageSrc: "/images/pertolongan.png",
      lineColor: "#79A0B4",
    },
    {
      title: "Obat-Obatan",
      desc: "Informasi obat-obatan yang tersedia di UKS sekolah.",
      path: "/obat-obatan",
      imageSrc: "/images/obatan.png",
      lineColor: "#79A0B4",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* 1. Hero Section */}
      <section
        className="relative py-20 px-10 md:px-16 flex flex-col md:flex-row items-center justify-between bg-cover bg-center min-h-[420px]"
        style={{ backgroundImage: "url('/images/bc.png')" }}
      >
        <div className="absolute inset-0 bg-sky-200/30"></div>

        <div className="relative z-10 max-w-xl">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#0A405A] mb-4 leading-tight">
            Welcome to <br />
            <span className="text-white">Gridas</span>
            <span className="text-red-500">Care</span> <br />
            <span className="text-[#0A405A]">SMK Negeri 2</span>
          </h1>
          <p className="text-gray-700 mb-8 max-w-md text-sm md:text-base">
            GridasCare hadir untuk mewujudkan lingkungan sekolah yang sehat, aman, dan siap membantu.
          </p>
          <Link
            href="#menu-section"
            className="bg-[#0A405A] text-white px-8 py-3 rounded-full hover:bg-gray-800 transition shadow-lg inline-block"
          >
            Lihat Informasi →
          </Link>
        </div>

        {/* Kontainer Logo UKS dan Logo Sekolah */}
        <div className="relative z-10 mt-8 md:mt-0 flex items-start justify-center gap-6 md:gap-8">
          <div className="w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
            <img
              src="/images/uks.png"
              alt="Logo UKS"
              className="w-full h-full object-contain"
            />
          </div>

          <div className="w-20 h-20 md:w-28 md:h-28 flex items-center justify-center -translate-y-8 md:-translate-y-12">
            <img
              src="/images/smk.png"
              alt="Logo Sekolah"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </section>

      {/* 2. Grid Menu Section */}
      <section id="menu-section" className="py-16 px-10 md:px-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {menuItems.map((menu: MenuItem) => (
            <Link
              href={menu.path}
              key={menu.title}
              className="block transition-transform duration-200 hover:-translate-y-2"
            >
              <div className="bg-white p-8 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] text-center border border-gray-100 flex flex-col items-center h-full cursor-pointer">

                {/* Container Gambar Fitur */}
                <div className="w-20 h-20 mb-3 flex items-center justify-center">
                  <img
                    src={menu.imageSrc}
                    alt={menu.title}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>

                <div
                  className="w-10 h-1 rounded-full mb-5"
                  style={{ backgroundColor: menu.lineColor }}
                ></div>

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