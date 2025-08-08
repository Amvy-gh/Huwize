import { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { getLaporan, showGambarLaporan } from "../services/Laporan/laporan.service";
import { FaFileAlt, FaSearch, FaChevronLeft, FaChevronRight, FaPlus, FaLeaf } from "react-icons/fa";
import { BsFillXCircleFill } from 'react-icons/bs';
import { useAuth } from "../context/AuthContext";

const Laporan = () => {
  const [laporanData, setLaporanData] = useState([]);
  const [showDescription, setShowDescription] = useState(false);
  const [selectedDescription, setSelectedDescription] = useState("");
  const [showImage, setShowImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const itemsPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        getLaporan((data) => {
          const sortedData = data.data.sort((a, b) => {
            const dateA = new Date(a.tanggal_laporan.replace(',', ''));
            const dateB = new Date(b.tanggal_laporan.replace(',', ''));
            return dateB - dateA;
          });
          setLaporanData(sortedData);
          setFilteredData(sortedData);
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = laporanData.filter(laporan =>
      laporan.lokasi_laporan.toLowerCase().includes(searchTerm.toLowerCase()) ||
      laporan.deskripsi_laporan.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  }, [searchTerm, laporanData]);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const openDescriptionModal = (description) => {
    setSelectedDescription(description);
    setShowDescription(true);
  };

  const closeDescriptionModal = (e) => {
    if (e.target === e.currentTarget) {
      setShowDescription(false);
    }
  };

  const openImageModal = (imageSrc) => {
    setSelectedImage(imageSrc);
    setShowImage(true);
  };

  return (
    <Fragment>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        {/* Cleaner Hero Section */}
        <div className="relative bg-gradient-to-r from-emerald-600 to-green-700 text-white overflow-hidden">
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-32 translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full translate-y-24 -translate-x-24"></div>
          </div>
          
          <div className="relative z-10 container mx-auto px-4 py-16">
            <div className="max-w-4xl mx-auto text-center">
              {/* Compact Icon */}
              <div className="flex justify-center mb-4">
                <div className="bg-white/20 p-3 rounded-full">
                  <FaLeaf className="text-xl text-white" />
                </div>
              </div>
              
              {/* Smaller Main Heading */}
              <h1 className="text-3xl lg:text-4xl font-bold mb-4">
                Layanan Pengaduan Lingkungan
              </h1>
              
              {/* Concise Subtitle */}
              <p className="text-base lg:text-lg text-green-100 max-w-2xl mx-auto mb-8">
                Laporkan masalah lingkungan di Desa Way Huwi dan mari bersama menjaga kelestarian desa kita
              </p>
              
              {/* CTA Button */}
              <button
                onClick={() => navigate("/form-laporan")}
                className="group bg-white text-green-700 px-6 py-3 rounded-full font-semibold hover:bg-green-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center mx-auto"
              >
                <FaPlus className="mr-2 text-sm group-hover:rotate-90 transition-transform duration-300" />
                <span>Buat Laporan Baru</span>
              </button>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="container mx-auto px-4 py-12 relative -mt-16 z-10">
          <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8 border border-gray-100">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Daftar Laporan Terkini</h2>
                <p className="text-gray-600">Pantau perkembangan laporan masalah lingkungan</p>
              </div>
              <div className="hidden lg:flex items-center space-x-2 text-sm text-gray-500">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></div>
                  <span>Dalam Proses</span>
                </div>
                <div className="flex items-center ml-4">
                  <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
                  <span>Selesai</span>
                </div>
              </div>
            </div>
            
            {/* Enhanced Search Bar */}
            <div className="mb-8">
              <div className="max-w-md mx-auto">
                <div className="relative group">
                  <input
                    type="text"
                    placeholder="Cari laporan berdasarkan lokasi atau deskripsi..."
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-green-100 focus:border-green-400 transition-all duration-200 bg-gray-50 focus:bg-white group-hover:border-gray-300"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-green-500 transition-colors" />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <BsFillXCircleFill />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Enhanced Table */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-gray-800 to-gray-900 text-white">
                      <th className="px-6 py-5 text-left font-semibold text-sm">Tanggal</th>
                      <th className="px-6 py-5 text-center font-semibold text-sm">Status</th>
                      <th className="px-6 py-5 text-left font-semibold text-sm">Lokasi</th>
                      <th className="px-6 py-5 text-center font-semibold text-sm">Deskripsi</th>
                      <th className="px-6 py-5 text-center font-semibold text-sm">Gambar</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {currentItems.map((laporan, index) => (
                      <tr key={laporan.id_laporan} 
                          className="hover:bg-gray-50 transition-colors duration-200 group">
                        <td className="px-6 py-5 text-sm text-gray-700 font-medium">
                          {laporan.tanggal_laporan}
                        </td>
                        <td className="px-6 py-5 text-center">
                          <span className={`px-4 py-2 rounded-full text-xs font-semibold inline-flex items-center min-w-[120px] justify-center
                            ${laporan.status === "Aktif"
                              ? "bg-yellow-100 text-yellow-800 border border-yellow-300"
                              : "bg-green-100 text-green-800 border border-green-300"}`}>
                            <div className={`w-2 h-2 rounded-full mr-2 ${
                              laporan.status === "Aktif" ? "bg-yellow-500" : "bg-green-500"
                            }`}></div>
                            {laporan.status === "Aktif" ? "Dalam Proses" : "Selesai"}
                          </span>
                        </td>
                        <td className="px-6 py-5 text-sm text-gray-700 font-medium">
                          {laporan.lokasi_laporan}
                        </td>
                        <td className="px-6 py-5 text-center">
                          <button
                            onClick={() => openDescriptionModal(laporan.deskripsi_laporan)}
                            className="text-blue-600 hover:text-blue-800 p-3 rounded-full hover:bg-blue-50 transition-all duration-200 group-hover:bg-blue-100"
                            title="Lihat deskripsi lengkap"
                          >
                            <FaFileAlt className="text-lg" />
                          </button>
                        </td>
                        <td className="px-6 py-5 text-center">
                          {laporan.gambar_laporan && (
                            <div className="flex justify-center">
                              <img
                                src={showGambarLaporan(laporan.gambar_laporan)}
                                alt="Laporan"
                                className="w-14 h-14 rounded-xl object-cover cursor-pointer hover:opacity-90 transition-all duration-200 border-2 border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md transform hover:scale-105"
                                onClick={() => openImageModal(showGambarLaporan(laporan.gambar_laporan))}
                              />
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Enhanced Pagination */}
              <div className="px-6 py-6 bg-gray-50 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                  <p className="text-sm text-gray-600 font-medium">
                    Menampilkan <span className="font-bold">{indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredData.length)}</span> dari <span className="font-bold">{filteredData.length}</span> laporan
                  </p>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="p-3 rounded-xl hover:bg-green-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent transition-colors border border-gray-200"
                    >
                      <FaChevronLeft className={currentPage === 1 ? "text-gray-400" : "text-green-600"} />
                    </button>
                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i + 1}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`w-10 h-10 rounded-xl text-sm font-semibold transition-all ${
                          currentPage === i + 1
                            ? "bg-green-600 text-white shadow-lg"
                            : "text-gray-600 hover:bg-green-100 border border-gray-200"
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="p-3 rounded-xl hover:bg-green-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent transition-colors border border-gray-200"
                    >
                      <FaChevronRight className={currentPage === totalPages ? "text-gray-400" : "text-green-600"} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Modals */}
        {showDescription && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4"
               onClick={closeDescriptionModal}>
            <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl border border-gray-100">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">Detail Laporan</h3>
                  <p className="text-gray-500 mt-1">Deskripsi lengkap laporan</p>
                </div>
                <button 
                  onClick={() => setShowDescription(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <BsFillXCircleFill className="text-gray-500 hover:text-gray-700 text-xl" />
                </button>
              </div>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{selectedDescription}</p>
              </div>
            </div>
          </div>
        )}

        {showImage && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-50 p-4"
               onClick={() => setShowImage(false)}>
            <div className="relative max-w-4xl max-h-[90vh]">
              <img 
                src={selectedImage} 
                alt="Laporan" 
                className="max-h-[90vh] w-auto rounded-2xl shadow-2xl" 
              />
              <button
                onClick={() => setShowImage(false)}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors backdrop-blur-sm"
              >
                <BsFillXCircleFill className="text-xl" />
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </Fragment>
  );
};

export default Laporan;