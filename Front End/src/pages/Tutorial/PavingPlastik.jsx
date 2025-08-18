import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const PavingPlastik = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      <Navbar variant="bg-emerald-800 shadow-lg" variant2="mt-0 py-2" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-emerald-800 mb-8">Paving Plastik</h1>
        {/* Tambahkan konten tutorial di sini */}
      </div>
      <Footer />
    </div>
  );
};

export default PavingPlastik;