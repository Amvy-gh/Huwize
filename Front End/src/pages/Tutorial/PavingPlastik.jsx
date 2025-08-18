import React, { useState } from 'react';
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { Download, Recycle, ArrowRight, CheckCircle, Play, Video, X, AlertTriangle, Scale, Clock } from 'lucide-react';

const materials = [
  { name: "Sampah plastik", amount: "250 gram", icon: "♻️" },
  { name: "Oli bekas", amount: "600 ml", icon: "🛢️" },
  { name: "Pasir", amount: "200 gram", icon: "⏳" },
  { name: "Kuali/Drum", amount: "1 buah", icon: "🥘" },
  { name: "Cetakan paving", amount: "1 set", icon: "📦" }
];

const steps = [
  {
    title: "Persiapan Bahan",
    description: "Kumpulkan sampah plastik dari berbagai sumber, lalu pilah berdasarkan jenisnya seperti botol plastik atau kemasan.",
    detail: "Siapkan bahan tambahan seperti pasir dan oli bekas untuk meningkatkan kekerasan dan kekuatan paving block."
  },
  {
    title: "Pemanasan Oli",
    description: "Panaskan kuali/drum lalu masukkan 600 ml oli bekas.",
    detail: "Pastikan suhu oli mencapai titik yang tepat untuk proses pencairan plastik."
  },
  {
    title: "Pencairan Plastik",
    description: "Masukkan 250 gram plastik ke dalam kuali hingga benar-benar mencair.",
    detail: "Aduk secara perlahan dan konsisten untuk memastikan plastik mencair merata."
  },
  {
    title: "Pencampuran",
    description: "Setelah plastik mencair, campurkan dengan 200 gram pasir dan aduk hingga merata.",
    detail: "Pastikan komposisi atau rasio campuran plastik dan pasir sudah pas agar menghasilkan paving block berkualitas."
  },
  {
    title: "Pencetakan",
    description: "Tuangkan campuran plastik cair ke dalam cetakan secara perlahan dan merata.",
    detail: "Padatkan adonan menggunakan alat pemadat untuk menghilangkan gelembung udara."
  },
  {
    title: "Pendinginan",
    description: "Biarkan paving block dingin dan mengeras di dalam cetakan atau area terbuka.",
    detail: "Setelah dingin dan keras, keluarkan dari cetakan dan lakukan pengecekan kualitas."
  }
];

const benefits = [
  "Mengurangi pencemaran lingkungan akibat sampah plastik",
  "Ringan namun memiliki kekuatan mekanik tinggi", 
  "Tahan lama dan tidak beracun",
  "Dapat diproduksi dengan biaya relatif rendah",
  "Cocok untuk jalan perumahan, halaman, atau area parkir"
];

const videoTutorials = [
  {
    "id": 1,
    "title": "DIY PAVING BLOCK PLASTIK: CARA PEMBUATAN PAVING BLOCK DARI SAMPAH PLASTIK JADI PRODUK BERMANFAAT!",
    "thumbnail": "https://img.youtube.com/vi/MJGM70BV7h8/maxresdefault.jpg",
    "videoId": "MJGM70BV7h8",
    "duration": "01:33",
    "author": "KKN KELOMPOK 01 INSTITUT TEKNOLOGI SUMATERA",
    "description": "Tips penting dan solusi masalah umum dalam pembuatan"
  },
  {
    id: 2,
    title: "Cara Membuat Paving Block dari Sampah Plastik",
    thumbnail: "https://img.youtube.com/vi/9XJm0bu9CAM/maxresdefault.jpg",
    videoId: "9XJm0bu9CAM", // YouTube video ID
    duration: "1:00",
    author: "kkn desadatar",
    description: "Panduan step-by-step lengkap cara membuat paving block dari sampah plastik"
  },
];

const specs = [
  {
    title: "Rasio Bahan",
    value: "5 : 12 : 4",
    detail: "(plastik : oli : pasir)",
    icon: <Scale className="w-12 h-12" />,
    color: "green"
  },
  {
    title: "Durasi Proses",
    value: "45-60 menit",
    detail: "waktu pembuatan total",
    icon: <Clock className="w-12 h-12" />,
    color: "blue"
  },
  {
    title: "Hasil Daur Ulang",
    value: "50% Recycle",
    detail: "plastik dari sampah, sisanya oli & pasir",
    icon: <Recycle className="w-12 h-12" />,
    color: "teal"
  }
];

const PavingPlastik = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [activeVideo, setActiveVideo] = useState(null);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/assets/buku_panduan_2.pdf';
    link.download = 'Buku_Panduan_Paving_Block.pdf';
    link.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-gray-50">
      <Navbar variant="bg-green-600 text-white shadow-lg" variant2="py-4" />
      
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <div className="mb-8">
            <img 
              src="/assets/paving.png" 
              alt="Paving Block dari Plastik"
              className="mx-auto w-64 h-64 object-cover rounded-2xl shadow-xl transform hover:scale-105 transition-transform duration-300 border-4 border-white"
            />
          </div>
          <h1 className="text-5xl font-bold text-gray-800 mb-6 leading-tight">
            Panduan Pembuatan Paving Block dari Sampah Plastik
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Ubah sampah plastik menjadi paving block berkualitas dengan panduan lengkap ini. 
            Solusi ramah lingkungan untuk mengurangi limbah sambil menciptakan produk yang bermanfaat.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={handleDownload}
              className="inline-flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <Download className="w-5 h-5" />
              Unduh Buku Panduan PDF
            </button>
            <a 
              href="#video-tutorial" 
              className="inline-flex items-center gap-3 bg-white hover:bg-gray-50 text-green-600 border-2 border-green-600 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <Video className="w-5 h-5" />
              Tonton Video Tutorial
            </a>
          </div>
        </div>

        {/* Specs Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {specs.map((spec, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className={`text-${spec.color}-600 mb-4 transform hover:scale-110 transition-transform`}>
                {spec.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{spec.title}</h3>
              <p className="text-2xl font-bold text-green-600 mb-1">{spec.value}</p>
              <p className="text-gray-600">{spec.detail}</p>
            </div>
          ))}
        </div>

        {/* Video Tutorial Section - Moved up */}
        <div className="mb-16" id="video-tutorial">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              🎬 Video Tutorial
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Pelajari teknik pembuatan paving block plastik melalui video tutorial lengkap
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
                        <div className="bg-green-600 p-4 rounded-full transform group-hover:scale-110 transition-transform">
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
                  <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                    {video.title}
                  </h3>
                  <p className="text-green-600 text-sm mb-3 font-medium">
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

        {/* Safety Warning Section */}
        <div className="mb-16">
          <div className="bg-gradient-to-r from-red-600 via-red-500 to-red-700 rounded-2xl p-8 text-white shadow-2xl">
            <div className="flex items-start gap-6">
              <AlertTriangle className="w-12 h-12 flex-shrink-0 text-yellow-300" />
              <div>
                <h3 className="text-2xl font-bold mb-4">
                  Panduan Keselamatan Kerja
                </h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-white/10 rounded-xl p-6 backdrop-blur-md border border-red-400">
                    <ul className="space-y-3 text-red-100">
                      <li className="flex items-start gap-3">
                        <span className="text-red-200 mt-1">•</span>
                        <span>Gunakan APD lengkap (sarung tangan, masker, kacamata)</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-red-200 mt-1">•</span>
                        <span>Pastikan area kerja berventilasi baik</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white/10 rounded-xl p-6 backdrop-blur-md border border-red-400">
                    <ul className="space-y-3 text-red-100">
                      <li className="flex items-start gap-3">
                        <span className="text-red-200 mt-1">•</span>
                        <span>Hati-hati dengan oli dan plastik panas</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-red-200 mt-1">•</span>
                        <span>Siapkan APAR sebagai tindakan preventif</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
            Mengapa Paving Block Plastik?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <Recycle className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-3">Ramah Lingkungan</h3>
              <p className="text-gray-600">Mengurangi pencemaran lingkungan akibat sampah plastik</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl font-bold">💪</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Berkualitas</h3>
              <p className="text-gray-600">Ringan, tahan lama, dan kekuatan mekanik tinggi</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl font-bold">💰</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Ekonomis</h3>
              <p className="text-gray-600">Dapat diproduksi dengan biaya relatif rendah</p>
            </div>
          </div>
        </div>

        {/* Materials Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
            Alat dan Bahan yang Dibutuhkan
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {materials.map((material, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center gap-4">
                  <span className="text-3xl">{material.icon}</span>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{material.name}</h3>
                    <p className="text-gray-600">{material.amount}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Steps Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
            Langkah-langkah Pembuatan
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Steps Navigation */}
            <div className="space-y-4">
              {steps.map((step, index) => (
                <div 
                  key={index}
                  onClick={() => setActiveStep(index)}
                  className={`p-6 rounded-xl cursor-pointer transition-all duration-300 ${
                    activeStep === index 
                      ? 'bg-green-600 text-white shadow-lg' 
                      : 'bg-white text-gray-800 hover:bg-gray-50 shadow-md'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      activeStep === index ? 'bg-white text-green-600' : 'bg-green-600 text-white'
                    }`}>
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold mb-1">{step.title}</h3>
                      <p className={`text-sm ${activeStep === index ? 'text-green-100' : 'text-gray-600'}`}>
                        {step.description}
                      </p>
                    </div>
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              ))}
            </div>

            {/* Step Detail */}
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-xl mr-4">
                  {activeStep + 1}
                </div>
                <h3 className="text-2xl font-bold text-gray-800">{steps[activeStep].title}</h3>
              </div>
              <p className="text-gray-700 leading-relaxed mb-6">
                {steps[activeStep].description}
              </p>
              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-green-600">
                <h4 className="font-semibold text-gray-800 mb-2">Tips:</h4>
                <p className="text-gray-600">{steps[activeStep].detail}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits List */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
            Keunggulan Paving Block Plastik
          </h2>
          <div className="bg-white rounded-xl p-8 shadow-md">
            <div className="grid md:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="bg-green-100 rounded-2xl p-10 mb-16 shadow-lg border border-green-200">
          <h2 className="text-3xl font-bold mb-8 text-center text-green-800">
            💡 Tips Penting untuk Sukses
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Proses Pembuatan */}
            <div className="bg-green-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <h4 className="font-bold text-xl mb-4 text-green-700">Proses Pembuatan</h4>
              <ul className="space-y-3 text-green-800 text-base">
                <li className="flex items-start gap-3">
                  <span className="font-bold mt-1 text-green-500">•</span>
                  <span>Kontrol suhu pemanasan dengan cermat</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold mt-1 text-green-500">•</span>
                  <span>Aduk campuran secara merata</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold mt-1 text-green-500">•</span>
                  <span>Pastikan rasio bahan yang tepat</span>
                </li>
              </ul>
            </div>
            
            {/* Hasil Akhir */}
            <div className="bg-green-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <h4 className="font-bold text-xl mb-4 text-green-700">Hasil Akhir</h4>
              <ul className="space-y-3 text-green-800 text-base">
                <li className="flex items-start gap-3">
                  <span className="font-bold mt-1 text-green-500">•</span>
                  <span>Padatkan adonan dengan sempurna</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold mt-1 text-green-500">•</span>
                  <span>Biarkan dingin secara alami</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold mt-1 text-green-500">•</span>
                  <span>Cek kualitas sebelum penggunaan</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Improved Call to Action */}
        <div className="text-center bg-white rounded-2xl p-12 shadow-lg border border-green-100">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Mulai Perjalanan Ramah Lingkungan Anda
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
            Dengan mengikuti panduan ini, Anda turut berkontribusi dalam mengurangi sampah plastik 
            dan menciptakan produk yang bermanfaat untuk lingkungan.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={handleDownload}
              className="inline-flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <Download className="w-5 h-5" />
              Unduh Panduan Lengkap
            </button>
            <a 
              href="#video-tutorial" 
              className="inline-flex items-center gap-3 bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
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

export default PavingPlastik;