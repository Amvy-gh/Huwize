import { useEffect, useState } from "react";
import { FaCheck, FaTimes, FaEye, FaSearch, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { BsFillXCircleFill } from 'react-icons/bs';
import { getLaporan, updateStatus, showGambarLaporan } from "../../../services/Laporan/laporan.service";

const LaporanTable = () => {
  const [laporanData, setLaporanData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [laporansPerPage] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState("");
  const [showDescription, setShowDescription] = useState(false);
  const [selectedDescription, setSelectedDescription] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    getLaporan((data) => {
      const sortedData = data.data.sort((a, b) => {
        // First compare by status (Aktif comes first)
        if (a.status !== b.status) {
          return a.status === "Aktif" ? -1 : 1;
        }
        // If status is same, sort by date (newest first)
        const dateA = new Date(a.tanggal_laporan.replace(',', ''));
        const dateB = new Date(b.tanggal_laporan.replace(',', ''));
        return dateB - dateA;
      });
      setLaporanData(sortedData);
      setFilteredData(sortedData); // Initialize filtered data
    });
  }, []);

  // Add new useEffect for search filtering
  useEffect(() => {
    const filtered = laporanData.filter(laporan =>
      laporan.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      laporan.lokasi_laporan.toLowerCase().includes(searchTerm.toLowerCase()) ||
      laporan.deskripsi_laporan.toLowerCase().includes(searchTerm.toLowerCase()) ||
      laporan.no_telepon.includes(searchTerm)
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  }, [searchTerm, laporanData]);

  const indexOfLastLaporan = currentPage * laporansPerPage;
  const indexOfFirstLaporan = indexOfLastLaporan - laporansPerPage;
  const currentLaporans = filteredData.slice(indexOfFirstLaporan, indexOfLastLaporan);
  const totalPages = Math.ceil(filteredData.length / laporansPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Set imagehhhh
  const openModal = (imageSrc) => {
    setCurrentImage(imageSrc);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const formatDate = (dateString) => {
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const months = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
    
    const date = new Date(dateString);
    const dayName = days[date.getDay()];
    const day = String(date.getDate()).padStart(2, '0');
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    
    return `${dayName}, ${day} ${month} ${year}`;
  };

  const openDescriptionModal = (description) => {
    setSelectedDescription(description);
    setShowDescription(true);
  };

  const closeDescriptionModal = (e) => {
    if (e.target === e.currentTarget) {
      setShowDescription(false);
    }
  };

  const handleStatusUpdate = async (id, currentStatus) => {
    try {
      await updateStatus(id, currentStatus);
      
      // Show simple alert message
      if (currentStatus === "Aktif") {
        alert("Status laporan berhasil diubah menjadi Selesai");
      } else {
        alert("Status laporan berhasil diubah menjadi Dalam Proses");
      }

      // Refresh data after status update
      getLaporan((data) => {
        const sortedData = data.data.sort((a, b) => {
          if (a.status !== b.status) {
            return a.status === "Aktif" ? -1 : 1;
          }
          const dateA = new Date(a.tanggal_laporan.replace(',', ''));
          const dateB = new Date(b.tanggal_laporan.replace(',', ''));
          return dateB - dateA;
        });
        setLaporanData(sortedData);
        setFilteredData(sortedData);
      });
    } catch (error) {
      alert("Gagal mengubah status laporan");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-7 px-4">
      <div className="max-w-full mx-auto">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-1">Daftar Laporan</h2>
            <p className="text-gray-600 text-sm">Kelola semua laporan yang telah dikirimkan</p>
          </div>
          <div className="text-sm text-gray-500">
            <span className="font-medium">Total: {filteredData.length} laporan</span>
          </div>
        </div>

        {/* Add Search Bar */}
        <div className="mb-6">
          <div className="max-w-md">
            <div className="relative">
              <input
                type="text"
                placeholder="Cari laporan berdasarkan nama, lokasi, atau deskripsi..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <BsFillXCircleFill className="text-sm" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gradient-to-r from-green-700 to-green-800 text-white">
                  <th className="px-4 py-3 text-left font-medium w-[5%]">ID</th>
                  <th className="px-4 py-3 text-left font-medium w-[12%]">Tanggal</th>
                  <th className="px-4 py-3 text-center font-medium w-[8%]">Status</th>
                  <th className="px-4 py-3 text-left font-medium w-[12%]">Nama</th>
                  <th className="px-4 py-3 text-left font-medium w-[12%]">No Telepon</th>
                  <th className="px-4 py-3 text-left font-medium w-[15%]">Lokasi</th>
                  <th className="px-4 py-3 text-center font-medium w-[20%]">Deskripsi</th>
                  <th className="px-4 py-3 text-center font-medium w-[8%]">Gambar</th>
                  <th className="px-4 py-3 text-center font-medium w-[8%]">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {currentLaporans.map((laporan, index) => (
                  <tr key={laporan.id_laporan} 
                      className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} 
                      hover:bg-green-50 transition-colors duration-150 border-b border-gray-100`}>
                    <td className="px-4 py-3 text-gray-700 font-medium">
                      #{laporan.id_laporan}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {laporan.tanggal_laporan}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium inline-flex items-center justify-center
                        ${laporan.status === "Aktif"
                          ? "bg-yellow-100 text-yellow-800 border border-yellow-300"
                          : "bg-green-100 text-green-800 border border-green-300"}`}>
                        <div className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                          laporan.status === "Aktif" ? "bg-yellow-500" : "bg-green-500"
                        }`}></div>
                        {laporan.status === "Aktif" ? "Proses" : "Selesai"}
                      </span>
                    </td>
                    <td className="px-2 py-3 text-gray-600">
                      <div className="whitespace-normal break-words">
                        {laporan.nama}
                      </div>
                    </td>
                    <td className="px-2 py-3 text-gray-600">
                      {laporan.no_telepon}
                    </td>
                    <td className="px-2 py-3 text-gray-600">
                      <div className="whitespace-normal break-words">
                        {laporan.lokasi_laporan}
                      </div>
                    </td>
                    <td className="px-2 py-3 text-center">
                      <button
                        onClick={() => openDescriptionModal(laporan.deskripsi_laporan)}
                        className="text-green-600 hover:text-green-800 p-2 rounded-full hover:bg-green-100 transition-all duration-200 group"
                        title="Lihat deskripsi lengkap"
                      >
                        <FaEye className="text-base group-hover:scale-110 transition-transform" />
                      </button>
                    </td>
                    <td className="px-4 py-3 text-center">
                      {laporan.gambar_laporan ? (
                        <div className="flex justify-center">
                          <img
                            src={showGambarLaporan(laporan.gambar_laporan)}
                            alt="Laporan"
                            className="w-12 h-12 rounded-lg object-cover cursor-pointer hover:opacity-90 transition-all duration-200 border border-gray-200 hover:shadow-md"
                            onClick={() => openModal(showGambarLaporan(laporan.gambar_laporan))}
                          />
                        </div>
                      ) : (
                        <span className="text-gray-400 text-xs">No Image</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {laporan.status === "Aktif" && (
                        <button
                          onClick={() => handleStatusUpdate(laporan.id_laporan, laporan.status)}
                          className="text-green-600 hover:text-green-800 p-2 rounded-full hover:bg-green-100 transition-all duration-200"
                          title="Tandai Selesai"
                        >
                          <FaCheck className="text-base" />
                        </button>
                      )}
                      {laporan.status === "Selesai" && (
                        <button
                          onClick={() => handleStatusUpdate(laporan.id_laporan, laporan.status)}
                          className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-100 transition-all duration-200"
                          title="Tandai Belum Selesai"
                        >
                          <FaTimes className="text-base" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Cards */}
        <div className="block md:hidden space-y-4">
          {currentLaporans.map((laporan) => (
            <div key={laporan.id_laporan} 
                 className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition-shadow duration-200">
              <div className="grid grid-cols-3 gap-y-3">
                <span className="font-semibold text-gray-700">ID Laporan</span>
                <span className="col-span-2">: #{laporan.id_laporan}</span>

                <span className="font-semibold text-gray-700">Tanggal</span>
                <span className="col-span-2">: {formatDate(laporan.tanggal_laporan)}</span>

                <span className="font-semibold text-gray-700">Status</span>
                <span className="col-span-2">
                  : <span className={`px-3 py-1 rounded-full text-sm font-medium inline-flex items-center
                      ${laporan.status === "Aktif"
                        ? "bg-yellow-100 text-yellow-800 border border-yellow-300"
                        : "bg-green-100 text-green-800 border border-green-300"}`}>
                      <div className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                        laporan.status === "Aktif" ? "bg-yellow-500" : "bg-green-500"
                      }`}></div>
                      {laporan.status === "Aktif" ? "Proses" : "Selesai"}
                    </span>
                </span>

                <span className="font-semibold text-gray-700">Nama</span>
                <span className="col-span-2 break-words">: {laporan.nama}</span>

                <span className="font-semibold text-gray-700">No. Telepon</span>
                <span className="col-span-2">: {laporan.no_telepon}</span>

                <span className="font-semibold text-gray-700">Lokasi</span>
                <span className="col-span-2 break-words">: {laporan.lokasi_laporan}</span>

                <span className="font-semibold text-gray-700 col-span-3">Deskripsi :</span>
                <div className="col-span-3">
                  <p className="text-gray-600 mt-1 whitespace-normal break-words line-clamp-3">
                    {laporan.deskripsi_laporan}
                  </p>
                  <button
                    onClick={() => openDescriptionModal(laporan.deskripsi_laporan)}
                    className="text-green-600 hover:text-green-800 text-sm font-medium mt-2 flex items-center hover:bg-green-50 px-3 py-1 rounded-lg transition-colors"
                  >
                    <FaEye className="mr-2" />
                    Baca Selengkapnya
                  </button>
                </div>
              </div>

              {/* Gambar */}
              <div className="mt-4">
                <span className="font-semibold text-gray-700 block mb-2">Gambar Laporan</span>
                {laporan.gambar_laporan ? (
                  <div className="relative">
                    <img
                      src={showGambarLaporan(laporan.gambar_laporan)}
                      alt="Gambar Laporan"
                      className="w-full h-48 rounded-lg object-cover cursor-pointer shadow-sm hover:shadow-md transition-all duration-200"
                      onClick={() => openModal(showGambarLaporan(laporan.gambar_laporan))}
                    />
                  </div>
                ) : (
                  <div className="text-gray-500 text-sm italic">Tidak ada gambar</div>
                )}
              </div>

              {/* Action Button */}
              <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end">
                {laporan.status === "Aktif" && (
                  <button
                    onClick={() => handleStatusUpdate(laporan.id_laporan, laporan.status)}
                    className="flex items-center px-4 py-2 text-sm font-medium text-green-600 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                  >
                    <FaCheck className="mr-2" />
                    Tandai Selesai
                  </button>
                )}
                {laporan.status === "Selesai" && (
                  <button
                    onClick={() => handleStatusUpdate(laporan.id_laporan, laporan.status)}
                    className="flex items-center px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                  >
                    <FaTimes className="mr-2" />
                    Tandai Belum Selesai
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Description & Image Modals */}
        {showDescription && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4"
               onClick={closeDescriptionModal}>
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg fon  t-semibold text-gray-800">Detail Laporan</h3>
                  <p className="text-gray-500 text-sm mt-1">Deskripsi lengkap laporan</p>
                </div>
                <button 
                  onClick={() => setShowDescription(false)}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <BsFillXCircleFill className="text-gray-500 hover:text-gray-700 text-lg" />
                </button>
              </div>
              <div className="prose prose-sm max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-normal break-words text-sm" style={{ wordWrap: 'break-word' }}>
                  {selectedDescription.split('\n').map((paragraph, idx) => (
                    <span key={idx}>
                      {paragraph}
                      <br />
                    </span>
                  ))}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Update Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between mt-6 bg-white px-4 py-3 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600 mb-4 sm:mb-0">
            Menampilkan <span className="font-bold">{indexOfFirstLaporan + 1}-{Math.min(indexOfLastLaporan, filteredData.length)}</span> dari <span className="font-bold">{filteredData.length}</span> laporan
          </p>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-3 rounded-xl hover:bg-green-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent transition-colors border border-gray-200"
            >
              <FaChevronLeft className={currentPage === 1 ? "text-gray-400" : "text-green-600"} />
            </button>

            {/* Pagination Numbers */}
            <div className="flex items-center space-x-2">
              {totalPages > 7 ? (
                <>
                  {/* First page */}
                  <button
                    onClick={() => setCurrentPage(1)}
                    className={`w-10 h-10 rounded-xl text-sm font-semibold transition-all ${
                      currentPage === 1
                        ? "bg-green-600 text-white shadow-lg"
                        : "text-gray-600 hover:bg-green-100 border border-gray-200"
                    }`}
                  >
                    1
                  </button>

                  {currentPage > 3 && <span className="text-gray-400">...</span>}

                  {[...Array(3)].map((_, i) => {
                    const pageNum = Math.min(
                      Math.max(currentPage - 1 + i, 2),
                      totalPages - 1
                    );
                    if (pageNum <= 1 || pageNum >= totalPages) return null;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-10 h-10 rounded-xl text-sm font-semibold transition-all ${
                          currentPage === pageNum
                            ? "bg-green-600 text-white shadow-lg"
                            : "text-gray-600 hover:bg-green-100 border border-gray-200"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  {currentPage < totalPages - 2 && <span className="text-gray-400">...</span>}

                  <button
                    onClick={() => setCurrentPage(totalPages)}
                    className={`w-10 h-10 rounded-xl text-sm font-semibold transition-all ${
                      currentPage === totalPages
                        ? "bg-green-600 text-white shadow-lg"
                        : "text-gray-600 hover:bg-green-100 border border-gray-200"
                    }`}
                  >
                    {totalPages}
                  </button>
                </>
              ) : (
                [...Array(totalPages)].map((_, i) => (
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
                ))
              )}
              </div>

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
  );
};

export default LaporanTable;
