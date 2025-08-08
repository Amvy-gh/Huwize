import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import Navbar from "../components/Navbar/Navbar";
import FormLaporan from "../components/Form/FormLaporan";
import Footer from "../components/Footer/Footer";

const FormLaporanPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Back Button */}
            <button
              onClick={() => navigate("/laporan")}
              className="mb-6 flex items-center text-gray-600 hover:text-green-700 transition-colors duration-200"
            >
              <FaArrowLeft className="mr-2" />
              <span>Kembali ke Daftar Laporan</span>
            </button>

            <div className="text-center mb-10">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                Formulir Pengaduan
              </h1>
              <p className="text-gray-600">
                Sampaikan laporan Anda untuk lingkungan yang lebih baik
              </p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <FormLaporan />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FormLaporanPage;
