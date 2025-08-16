import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaShieldAlt, FaUsers, FaLeaf } from "react-icons/fa";
import Navbar from "../components/Navbar/Navbar";
import FormLaporan from "../components/Form/FormLaporan";
import Footer from "../components/Footer/Footer";

const FormLaporanPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 py-8 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <button
              onClick={() => navigate("/laporan")}
              className="mb-8 flex items-center text-gray-600 hover:text-green-700 transition-all duration-200 group"
            >
              <FaArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
              <span className="font-medium">Kembali ke Daftar Laporan</span>
            </button>

            {/* Header Section */}
            <div className="text-center mb-12">
              <div className="flex justify-center mb-6">
                <div className="bg-green-100 p-4 rounded-full">
                  <FaShieldAlt className="text-green-600 text-3xl" />
                </div>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                Formulir Pengaduan
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Sampaikan laporan Anda untuk menciptakan lingkungan yang lebih baik dan berkelanjutan
              </p>
              
              {/* Stats or Trust Indicators */}
              <div className="flex flex-wrap justify-center gap-8 mt-8 text-sm text-gray-600">
                <div className="flex items-center">
                  <FaUsers className="text-green-500 mr-2" />
                  <span>1000+ Laporan Terproses</span>
                </div>
                <div className="flex items-center">
                  <FaLeaf className="text-green-500 mr-2" />
                  <span>Lingkungan Terjaga</span>
                </div>
                <div className="flex items-center">
                  <FaShieldAlt className="text-green-500 mr-2" />
                  <span>Data Aman & Terpercaya</span>
                </div>
              </div>
            </div>
            
            {/* Form Card */}
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
              {/* Card Header */}
              <div className="bg-gradient-to-r from-green-500 to-green-600 px-8 py-6">
                <h2 className="text-2xl font-semibold text-white">
                  Form Pengaduan Lingkungan
                </h2>
                <p className="text-green-100 mt-1">
                  Isi form di bawah dengan lengkap dan jelas
                </p>
              </div>
              
              {/* Form Content */}
              <div className="p-8 md:p-12">
                <FormLaporan />
              </div>
            </div>

            {/* Information Section */}
            <div className="mt-12 grid md:grid-cols-3 gap-6 text-center">
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 text-xl font-bold">1</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Isi Form</h3>
                <p className="text-gray-600 text-sm">
                  Lengkapi formulir dengan data yang akurat dan detail
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <div className="bg-yellow-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-yellow-600 text-xl font-bold">2</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Verifikasi</h3>
                <p className="text-gray-600 text-sm">
                  Tim kami akan memverifikasi laporan dalam 1x24 jam
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-green-600 text-xl font-bold">3</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Tindak Lanjut</h3>
                <p className="text-gray-600 text-sm">
                  Laporan akan ditindaklanjuti oleh instansi terkait
                </p>
              </div>
            </div>

            {/* Privacy Notice */}
            <div className="mt-8 bg-gray-50 border border-gray-200 rounded-xl p-6 text-center">
              <p className="text-gray-600 text-sm">
                <FaShieldAlt className="inline mr-2 text-green-500" />
                Data pribadi Anda akan dijaga kerahasiaannya sesuai dengan kebijakan privasi kami
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FormLaporanPage;