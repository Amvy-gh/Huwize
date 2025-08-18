import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { Download, Clock, Users, Leaf, ChevronRight, CheckCircle } from "lucide-react";

const Ecoenzym = () => {
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
              className="mx-auto w-64 h-64 object-cover rounded-full shadow-2xl border-8 border-white"
            />
          </div>
          <h1 className="text-5xl font-bold text-emerald-800 mb-6">
            Panduan Pembuatan Eco Enzyme
          </h1>
          <p className="text-xl text-emerald-700 max-w-3xl mx-auto leading-relaxed">
            Ubah sampah organik menjadi pembersih alami yang ramah lingkungan. 
            Eco-enzyme adalah solusi sederhana untuk mengurangi limbah rumah tangga 
            sambil menciptakan produk yang bermanfaat.
          </p>
          
          {/* Download Button */}
          <div className="mt-8">
            <button 
              onClick={handleDownload}
              className="inline-flex items-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <Download className="w-5 h-5" />
              Unduh Buku Panduan PDF
            </button>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-emerald-600 mb-4">
              <Clock className="w-12 h-12" />
            </div>
            <h3 className="text-xl font-bold text-emerald-800 mb-3">Durasi Fermentasi</h3>
            <p className="text-emerald-700">90 hari atau 3 bulan proses fermentasi alami</p>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-emerald-600 mb-4">
              <Users className="w-12 h-12" />
            </div>
            <h3 className="text-xl font-bold text-emerald-800 mb-3">Rasio Bahan</h3>
            <p className="text-emerald-700">1 : 3 : 10 (sampah organik : gula : air)</p>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-emerald-600 mb-4">
              <Leaf className="w-12 h-12" />
            </div>
            <h3 className="text-xl font-bold text-emerald-800 mb-3">100% Alami</h3>
            <p className="text-emerald-700">Dibuat dari bahan organik tanpa kimia berbahaya</p>
          </div>
        </div>

        {/* Ingredients Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-emerald-800 text-center mb-12">
            Alat dan Bahan yang Dibutuhkan
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ingredients.map((ingredient, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-4">
                  <span className="text-3xl">{ingredient.icon}</span>
                  <span className="text-emerald-800 font-medium">{ingredient.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Steps Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-emerald-800 text-center mb-12">
            Langkah-langkah Pembuatan
          </h2>
          <div className="space-y-6">
            {steps.map((step, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    {step.step}
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold text-emerald-800 mb-2">{step.title}</h3>
                    <p className="text-emerald-700 leading-relaxed">{step.description}</p>
                  </div>
                  <ChevronRight className="w-6 h-6 text-emerald-400" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-emerald-800 text-center mb-12">
            Manfaat Eco Enzyme
          </h2>
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="grid md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                  <span className="text-emerald-800">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-6 text-center">💡 Tips Penting</h2>
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div>
              <h4 className="font-semibold mb-2">Selama Proses Fermentasi:</h4>
              <ul className="space-y-1 opacity-90">
                <li>• Buka tutup setiap hari pada minggu pertama</li>
                <li>• Aduk campuran pada hari ke-7 dan ke-30</li>
                <li>• Simpan di tempat yang sejuk dan kering</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Hasil Akhir:</h4>
              <ul className="space-y-1 opacity-90">
                <li>• Cairan berwarna cokelat kekuningan</li>
                <li>• Aroma asam segar seperti cuka</li>
                <li>• Dapat disimpan hingga bertahun-tahun</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <h2 className="text-2xl font-bold text-emerald-800 mb-4">
            Mulai Perjalanan Ramah Lingkungan Anda
          </h2>
          <p className="text-emerald-700 mb-8 max-w-2xl mx-auto">
            Dengan mengikuti panduan ini, Anda turut berkontribusi dalam mengurangi sampah 
            dan menciptakan lingkungan yang lebih sehat untuk generasi mendatang.
          </p>
          <button 
            onClick={handleDownload}
            className="inline-flex items-center gap-3 bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <Download className="w-4 h-4" />
            Unduh Panduan Lengkap
          </button>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Ecoenzym;