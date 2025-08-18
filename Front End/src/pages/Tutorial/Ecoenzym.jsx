import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { Download, Clock, Users, Leaf, ChevronRight, CheckCircle, Play, Video, X } from "lucide-react";

const Ecoenzym = () => {
  const [activeVideo, setActiveVideo] = useState(null);

  const ingredients = [
    { name: "Botol plastik dengan tutup rapat", icon: "🍶" },
    { name: "Gula merah", icon: "🟤" },
    { name: "Air bersih", icon: "💧" },
    { name: "Sisa sayur/buah segar", icon: "🥬" },
    { name: "Pengaduk", icon: "🥄" }
  ];

  const steps = [
    {
      step: 1,  
      title: "Persiapan Air",
      description: "Siapkan sejumlah air bersih dalam wadah botol plastik"
    },
    {
      step: 2,
      title: "Haluskan Gula Merah",
      description: "Siapkan gula merah, lalu haluskan menjadi ukuran yang lebih kecil"
    },
    {
      step: 3,
      title: "Potong Bahan Organik",
      description: "Potong sisa sayur atau buah yang belum dimasak untuk dijadikan bahan"
    },
    {
      step: 4,
      title: "Campurkan Gula",
      description: "Masukkan gula merah yang telah halus ke dalam botol yang sudah berisi air"
    },
    {
      step: 5,
      title: "Aduk Larutan",
      description: "Aduk hingga gula merah larut sempurna"
    },
    {
      step: 6,
      title: "Tambahkan Bahan Organik",
      description: "Masukkan potongan sisa sayur atau buah yang telah disiapkan sebelumnya"
    },
    {
      step: 7,
      title: "Proses Fermentasi",
      description: "Simpan wadah dalam tempat yang sejuk, kemudian diamkan hingga 1 sampai 3 bulan"
    },
    {
      step: 8,
      title: "Perawatan Rutin",
      description: "Buka tutup botol setiap harinya pada 1 minggu pertama dan aduk pada hari ke-7 dan hari ke-30"
    }
  ];

  const benefits = [
    "Mengurangi sampah organik rumah tangga",
    "Pembersih ramah lingkungan",
    "Hemat biaya dan mudah dibuat",
    "Multifungsi untuk berbagai kebutuhan",
    "Membantu fermentasi alami"
  ];

  const videoTutorials = [
    {
      "id": 1,
      "title": "DIY Eco Enzyme: Cara Simpel Olah Limbah Dapur Jadi Produk Bermanfaat",
      "thumbnail": "https://img.youtube.com/vi/SvnmNxX2tMI/maxresdefault.jpg",
      "videoId": "SvnmNxX2tMI",
      "duration": "00:53",
      "author": "KKN KELOMPOK 01 INSTITUT TEKNOLOGI SUMATERA",
      "description": "Video tutorial step-by-step pembuatan eco enzyme dari awal hingga selesai"
    },
    {
      id: 2,
      title: "Ciri-Ciri ECO ENZYME Berhasil, Deteksi Dini sebelum Gagal",
      thumbnail: "https://img.youtube.com/vi/4AUAjCBp8lQ/maxresdefault.jpg",
      videoId: "4AUAjCBp8lQ",
      duration: "8:45",
      author: "Pak Eko Projects",
      description: "Tips penting agar eco enzyme Anda berhasil dan berkualitas tinggi"
    }
  ];

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/assets/buku_panduan_1.pdf';
    link.download = 'Buku_Panduan_Eco_Enzyme.pdf';
    link.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      <Navbar variant="bg-emerald-800 shadow-lg" variant2="mt-0 py-2" />
      
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <div className="mb-8">
            <img 
              src="/assets/eco.png" 
              alt="Eco Enzyme" 
              className="mx-auto w-64 h-64 object-cover rounded-full shadow-2xl border-8 border-white transform hover:scale-105 transition-transform duration-300"
            />
          </div>
          <h1 className="text-5xl font-bold text-emerald-800 mb-6 leading-tight">
            Panduan Pembuatan Eco Enzyme
          </h1>
          <p className="text-xl text-emerald-700 max-w-3xl mx-auto leading-relaxed mb-8">
            Ubah sampah organik menjadi pembersih alami yang ramah lingkungan. 
            Eco-enzyme adalah solusi sederhana untuk mengurangi limbah rumah tangga 
            sambil menciptakan produk yang bermanfaat.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={handleDownload}
              className="inline-flex items-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <Download className="w-5 h-5" />
              Unduh Buku Panduan PDF
            </button>
            <a 
              href="#video-tutorial" 
              className="inline-flex items-center gap-3 bg-white hover:bg-gray-50 text-emerald-600 border-2 border-emerald-600 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <Video className="w-5 h-5" />
              Tonton Video Tutorial
            </a>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="text-emerald-600 mb-4 transform hover:scale-110 transition-transform">
              <Clock className="w-12 h-12" />
            </div>
            <h3 className="text-xl font-bold text-emerald-800 mb-3">Durasi Fermentasi</h3>
            <p className="text-emerald-700">90 hari atau 3 bulan proses fermentasi alami</p>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="text-emerald-600 mb-4 transform hover:scale-110 transition-transform">
              <Users className="w-12 h-12" />
            </div>
            <h3 className="text-xl font-bold text-emerald-800 mb-3">Rasio Bahan</h3>
            <p className="text-emerald-700">1 : 3 : 10 (sampah organik : gula : air)</p>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="text-emerald-600 mb-4 transform hover:scale-110 transition-transform">
              <Leaf className="w-12 h-12" />
            </div>
            <h3 className="text-xl font-bold text-emerald-800 mb-3">100% Alami</h3>
            <p className="text-emerald-700">Dibuat dari bahan organik tanpa kimia berbahaya</p>
          </div>
        </div>

        {/* Video Tutorial Section - Moved up for better flow */}
        <div className="mb-16" id="video-tutorial">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-emerald-800 mb-4">
              🎬 Video Tutorial Pembuatan Eco Enzyme
            </h2>
            <p className="text-xl text-emerald-700 max-w-3xl mx-auto">
              Pelajari cara membuat eco enzyme dengan mudah melalui video tutorial lengkap kami
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {videoTutorials.map((video) => (
              <div key={video.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                <div className="relative">
                  {activeVideo === video.id ? (
                    <div className="relative pt-[56.25%]">
                      <iframe
                        className="absolute inset-0 w-full h-full"
                        src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1`}
                        title={video.title}
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                      ></iframe>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveVideo(null);
                        }}
                        className="absolute top-4 right-4 bg-black/70 hover:bg-black/90 text-white p-2 rounded-full transition-colors"
                      >
                        <X className="w-6 h-6" />
                      </button>
                    </div>
                  ) : (
                    <div 
                      className="relative group cursor-pointer" 
                      onClick={() => setActiveVideo(video.id)}
                    >
                      <img 
                        src={video.thumbnail} 
                        alt={video.title}
                        className="w-full h-56 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors flex items-center justify-center">
                        <div className="bg-emerald-600 p-4 rounded-full transform group-hover:scale-110 transition-transform">
                          <Play className="w-8 h-8 text-white ml-1" />
                        </div>
                      </div>
                      <div className="absolute bottom-3 right-3 bg-black/75 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {video.duration}
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-emerald-800 mb-2 line-clamp-2">
                    {video.title}
                  </h3>
                  <p className="text-emerald-600 text-sm mb-3 font-medium">
                    {video.author}
                  </p>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {video.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ingredients Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-emerald-800 text-center mb-4">
            Alat dan Bahan yang Dibutuhkan
          </h2>
          <p className="text-emerald-700 text-center mb-12 text-lg">
            Semua bahan mudah ditemukan di rumah atau pasar tradisional
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ingredients.map((ingredient, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-emerald-100">
                <div className="flex items-center gap-4">
                  <span className="text-4xl transform hover:scale-110 transition-transform">{ingredient.icon}</span>
                  <span className="text-emerald-800 font-medium text-lg">{ingredient.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Steps Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-emerald-800 text-center mb-4">
            Langkah-langkah Pembuatan
          </h2>
          <p className="text-emerald-700 text-center mb-12 text-lg">
            Ikuti 8 langkah mudah untuk membuat eco enzyme berkualitas
          </p>
          <div className="space-y-6">
            {steps.map((step, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-emerald-500">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg">
                    {step.step}
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold text-emerald-800 mb-2">{step.title}</h3>
                    <p className="text-emerald-700 leading-relaxed text-lg">{step.description}</p>
                  </div>
                  <ChevronRight className="w-6 h-6 text-emerald-400 transform hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-emerald-800 text-center mb-4">
            Manfaat Eco Enzyme
          </h2>
          <p className="text-emerald-700 text-center mb-12 text-lg">
            Berbagai keuntungan yang Anda dapatkan dari eco enzyme
          </p>
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-emerald-100">
            <div className="grid md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors">
                  <CheckCircle className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                  <span className="text-emerald-800 font-medium text-lg">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="bg-emerald-50 rounded-2xl p-8 mb-16 shadow-md">
          <h2 className="text-3xl font-bold mb-8 text-center text-emerald-800">💡 Tips Penting untuk Sukses</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-emerald-200">
              <h4 className="font-semibold text-xl mb-4 text-emerald-700">Selama Proses Fermentasi:</h4>
              <ul className="space-y-3 text-emerald-800">
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-emerald-500">✔</span>
                  <span>Buka tutup setiap hari pada minggu pertama</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-emerald-500">✔</span>
                  <span>Aduk campuran pada hari ke-7 dan ke-30</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-emerald-500">✔</span>
                  <span>Simpan di tempat yang sejuk dan kering</span>
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-emerald-200">
              <h4 className="font-semibold text-xl mb-4 text-emerald-700">Hasil Akhir:</h4>
              <ul className="space-y-3 text-emerald-800">
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-emerald-500">✔</span>
                  <span>Cairan berwarna cokelat kekuningan</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-emerald-500">✔</span>
                  <span>Aroma asam segar seperti cuka</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-emerald-500">✔</span>
                  <span>Dapat disimpan hingga bertahun-tahun</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-white rounded-2xl p-12 shadow-lg border border-emerald-100">
          <h2 className="text-3xl font-bold text-emerald-800 mb-4">
            Mulai Perjalanan Ramah Lingkungan Anda
          </h2>
          <p className="text-emerald-700 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
            Dengan mengikuti panduan ini, Anda turut berkontribusi dalam mengurangi sampah 
            dan menciptakan lingkungan yang lebih sehat untuk generasi mendatang.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={handleDownload}
              className="inline-flex items-center gap-3 bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <Download className="w-5 h-5" />
              Unduh Panduan Lengkap
            </button>
            <a 
              href="#video-tutorial" 
              className="inline-flex items-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <Play className="w-5 h-5" />
              Lihat Video Tutorial
            </a>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Ecoenzym;