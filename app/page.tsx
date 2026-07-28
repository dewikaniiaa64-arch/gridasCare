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
      lineColor: "#79A0B4",
    },
    {
      title: "Pertolongan Pertama",
      desc: "Panduan P3K untuk penanganan cedera dan keadaan darurat.",
      path: "/pertolongan",
      imageSrc: "/images/pertolongan.png",
      lineColor: "#F52020",
    },
    {
      title: "Obat-Obatan",
      desc: "Informasi obat-obatan yang tersedia di UKS sekolah.",
      path: "/obat2",
      imageSrc: "/images/obatan.png",
      lineColor: "#79A0B4",
    },
  ];

  return (
    <div className="min-h-screen bg-white w-full overflow-x-hidden">

      {/* 1. HERO SECTION */}
      <section
        className="relative py-10 md:py-20 px-4 sm:px-8 md:px-16 bg-cover bg-center min-h-[500px] flex items-center justify-center"
        style={{ backgroundImage: "url('/images/bc.png')" }}
      >
        <div className="absolute inset-0 bg-sky-200/30"></div>

        {/* LOGO SMK: Selalu di Pojok Kanan Atas */}
        <div className="absolute top-4 right-4 sm:top-6 sm:right-8 z-20 w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24">
          <img
            src="/images/smk.png"
            alt="Logo SMK Negeri 2"
            className="w-full h-full object-contain drop-shadow-md"
          />
        </div>

        {/* KONTAINER UTAMA */}
        <div className="relative z-10 max-w-6xl w-full flex flex-col md:flex-row items-center justify-between gap-8 pt-6 md:pt-0">

          {/* SISI KIRI (Teks & Tombol) */}
          <div className="max-w-xl text-center md:text-left flex flex-col items-center md:items-start w-full">

            {/* Judul */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0A405A] mb-3 leading-tight">
              Welcome to <br />
              <span className="text-white">Gridas</span>
              <span className="text-red-500">Care</span> <br />
              <span className="text-[#0A405A]">SMK Negeri 2</span>
            </h1>

            {/* FOTO / LOGO UKS (Khusus Tampil di HP/Tablet di antara Judul & Motto) */}
            <div className="flex md:hidden items-center justify-center w-48 h-48 my-3">
              <img
                src="/images/uks.png"
                alt="Logo UKS"
                className="w-full h-full object-contain drop-shadow-lg"
              />
            </div>

            {/* Motto / Deskripsi (Dibuat BOLD & Pekat di HP agar Sangat Jelas) */}
            <p className="text-gray-900 font-bold md:font-medium md:text-gray-700 my-3 max-w-md text-sm sm:text-base leading-relaxed">
              GridasCare hadir untuk mewujudkan lingkungan sekolah yang sehat, aman, dan siap membantu.
            </p>

            {/* Tombol "Lihat Informasi" */}
            <Link
              href="#menu-section"
              className="bg-[#0A405A] text-white px-8 py-3 rounded-full hover:bg-gray-800 transition shadow-lg inline-block text-sm sm:text-base font-semibold mt-2"
            >
              Lihat Informasi →
            </Link>
          </div>

          {/* SISI KANAN (Logo UKS Khusus Tampilan Desktop/Laptop) */}
          <div className="hidden md:flex items-center justify-center w-80 h-80">
            <img
              src="/images/uks.png"
              alt="Logo UKS"
              className="w-full h-full object-contain drop-shadow-lg"
            />
          </div>

        </div>
      </section>

      {/* 2. GRID MENU SECTION */}
      <section id="menu-section" className="py-12 md:py-16 px-4 sm:px-8 md:px-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {menuItems.map((menu: MenuItem) => (
            <Link
              href={menu.path}
              key={menu.title}
              className="block transition-transform duration-200 hover:-translate-y-2 h-full"
            >
              <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] text-center border border-gray-100 flex flex-col items-center justify-between h-full cursor-pointer">
                <div className="flex flex-col items-center">

                  {/* Icon Menu */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 mb-3 flex items-center justify-center">
                    <img
                      src={menu.imageSrc}
                      alt={menu.title}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>

                  {/* Garis Aksen Warna */}
                  <div
                    className="w-10 h-1 rounded-full mb-4"
                    style={{ backgroundColor: menu.lineColor }}
                  ></div>

                  {/* Judul & Deskripsi Card */}
                  <h3 className="font-bold text-lg sm:text-xl mb-2 text-gray-800">{menu.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">{menu.desc}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
} 