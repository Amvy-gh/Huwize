import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaPlus, FaEye, FaSearch, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { BsFillXCircleFill } from 'react-icons/bs';
import { Link, useNavigate } from "react-router-dom";
import { deleteArtikel, getArtikel, showGambar } from "../../../services/Artikel/artikel.service";

const ArtikelTable = () => {
  const navigate = useNavigate();
  const [artikelData, setArtikelData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [artikelsPerPage] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState("");
  const [showDescription, setShowDescription] = useState(false);
  const [selectedDescription, setSelectedDescription] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch data artikel saat komponen pertama kali dirender
  useEffect(() => {
    getArtikel((data) => {
      const sortedData = data.data.sort((a, b) => {
        return new Date(b.tanggal_artikel) - new Date(a.tanggal_artikel);
      });
      setArtikelData(sortedData);
      setFilteredData(sortedData);
    });
  }, []);

  // Filter data berdasarkan search term
  useEffect(() => {
    const filtered = artikelData.filter(artikel =>
      artikel.judul_artikel.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artikel.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artikel.isi_artikel.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artikel.sumber_artikel.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  }, [searchTerm, artikelData]);

  const indexOfLastArtikel = currentPage * artikelsPerPage;
  const indexOfFirstArtikel = indexOfLastArtikel - artikelsPerPage;
  const currentArticles = filteredData.slice(indexOfFirstArtikel, indexOfLastArtikel);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(filteredData.length / artikelsPerPage);

  const handleDelete = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus artikel ini?")) {
      deleteArtikel(id)
        .then(() => {
          setArtikelData((prevData) => prevData.filter((artikel) => artikel.id_artikel !== id));
        })
        .catch((error) => {
          console.error("Error saat menghapus artikel:", error);
        });
    }
  };

  const openModal = (imageSrc) => {
    setCurrentImage(imageSrc);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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

  return (
    <div className="bg-gray-50 min-h-screen py-7 px-4">
      <div className="max-w-full mx-auto">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-1">Daftar Artikel</h2>
            <p className="text-gray-600 text-sm">Kelola semua artikel yang telah dipublikasikan</p>
          </div>
          <div className="text-sm text-gray-500">
            <span className="font-medium">Total: {filteredData.length} artikel</span>
          </div>
        </div>
        
        {/* Search Bar & Add Button */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <input
                type="text"
                placeholder="Cari artikel berdasarkan judul, author, atau konten..."
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
          
          <button 
            onClick={() => navigate("/tambah-artikel")} 
            className="flex items-center px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 text-sm font-medium"
          >
            <FaPlus className="mr-2 text-xs" /> Tambah Artikel Baru
          </button>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gradient-to-r from-green-700 to-green-800 text-white">
                  <th className="px-4 py-3 text-left font-medium w-[8%]">ID</th>
                  <th className="px-4 py-3 text-left font-medium w-[12%]">Tanggal</th>
                  <th className="px-4 py-3 text-left font-medium w-[20%]">Judul</th>
                  <th className="px-4 py-3 text-left font-medium w-[15%]">Author</th>
                  <th className="px-4 py-3 text-center font-medium w-[8%]">Konten</th>
                  <th className="px-4 py-3 text-left font-medium w-[20%]">Sumber</th>
                  <th className="px-4 py-3 text-center font-medium w-[8%]">Gambar</th>
                  <th className="px-4 py-3 text-center font-medium w-[9%]">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {currentArticles.map((artikel, index) => (
                  <tr key={artikel.id_artikel} 
                      className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} 
                      hover:bg-green-50 transition-colors duration-150 border-b border-gray-100`}>
                    <td className="px-4 py-3 text-gray-700 font-medium">
                      #{artikel.id_artikel}
                    </td>
                    <td className="px-2 py-3 text-gray-600">
                      {artikel.tanggal_artikel}
                    </td>

                    <td className="px-2 py-3 text-gray-700">
                      <div
                        className="whitespace-normal break-words max-w-[130px]"
                        title={artikel.judul_artikel}
                      >
                        {artikel.judul_artikel}
                      </div>
                    </td>

                    <td className="px-2 py-3 text-gray-600">
                      <div
                        className="whitespace-normal break-words max-w-[160px]"
                        title={artikel.author}
                      >
                        {artikel.author}
                      </div>
                    </td>

                    {/* Update desktop table cell for description */}
                    <td className="px-2 py-3 text-center">
                      <button
                        onClick={() => openDescriptionModal(artikel.isi_artikel)}
                        className="text-green-600 hover:text-green-800 p-2 rounded-full hover:bg-green-100 transition-all duration-200 group"
                        title="Lihat konten lengkap"
                      >
                        <FaEye className="text-base group-hover:scale-110 transition-transform" />
                      </button>
                    </td>

                    <td className="px-2 py-3 text-gray-600">
                      <div
                        className="whitespace-normal break-words max-w-[160px]"
                        title={artikel.sumber_artikel}
                      >
                        {artikel.sumber_artikel}
                      </div>
                    </td>
                    <td className="px-2 py-3 text-center">
                      {artikel.gambar_artikel ? (
                        <div className="flex justify-center">
                          <img
                            src={showGambar(artikel.gambar_artikel)}
                            alt="Gambar Artikel"
                            className="w-12 h-12 rounded-lg object-cover cursor-pointer hover:opacity-90 transition-all duration-200 border border-gray-200"
                            onClick={() => openModal(showGambar(artikel.gambar_artikel))}
                          />
                        </div>
                      ) : (
                        <span className="text-gray-400 text-xs">No Image</span>
                      )}
                    </td>
                    <td className="px-2 py-3 text-center">
                      <div className="flex justify-center space-x-1">
                        <button
                          className="text-blue-600 hover:text-blue-800 p-2 rounded-lg hover:bg-blue-50 transition-all duration-200"
                          title="Edit Artikel"
                          onClick={() => navigate(`/update-artikel/${artikel.id_artikel}`)}
                        >
                          <FaEdit className="text-sm" />
                        </button>
                        <button
                          className="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50 transition-all duration-200"
                          title="Hapus Artikel"
                          onClick={() => handleDelete(artikel.id_artikel)}
                        >
                          <FaTrash className="text-sm" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Cards */}
        <div className="block md:hidden space-y-4">
          {currentArticles.map((artikel) => (
            <div key={artikel.id_artikel} className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition-shadow duration-200">
              <div className="grid grid-cols-3 gap-y-3">
                <span className="font-semibold text-gray-700">ID Artikel</span>
                <span className="col-span-2">#{artikel.id_artikel}</span>

                <span className="font-semibold text-gray-700">Tanggal</span>
                <span className="col-span-2">{artikel.tanggal_artikel}</span>

                <span className="font-semibold text-gray-700">Judul</span>
                <span className="col-span-2 break-words">{artikel.judul_artikel}</span>

                <span className="font-semibold text-gray-700">Author</span>
                <span className="col-span-2 break-words">{artikel.author}</span>

                <span className="font-semibold text-gray-700">Sumber</span>
                <span className="col-span-2 break-words">{artikel.sumber_artikel}</span>

                <span className="font-semibold text-gray-700 col-span-3">Konten :</span>
                <div className="col-span-3">
                  <p className="text-gray-600 mt-1 whitespace-normal break-words line-clamp-3">
                    {artikel.isi_artikel}
                  </p>
                  <button
                    onClick={() => openDescriptionModal(artikel.isi_artikel)}
                    className="text-green-600 hover:text-green-800 text-sm font-medium mt-2 flex items-center hover:bg-green-50 px-3 py-1 rounded-lg transition-colors"
                  >
                    <FaEye className="mr-2" /> 
                    Baca Selengkapnya
                  </button>
                </div>
              </div>

              {/* Gambar */}
              <div className="mt-4">
                <span className="font-semibold text-gray-700 block mb-2">Gambar Artikel</span>
                {artikel.gambar_artikel ? (
                  <div className="relative">
                    <img
                      src={showGambar(artikel.gambar_artikel)}
                      alt="Gambar Artikel"
                      className="w-full h-48 rounded-lg object-cover cursor-pointer shadow-sm hover:shadow-md transition-all duration-200"
                      onClick={() => openModal(showGambar(artikel.gambar_artikel))}
                    />
                  </div>
                ) : (
                  <div className="text-gray-500 text-sm italic">Tidak ada gambar</div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end space-x-3">
                <button
                  onClick={() => navigate(`/update-artikel/${artikel.id_artikel}`)}
                  className="flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <FaEdit className="mr-2" />
                  Edit Artikel
                </button>
                <button
                  onClick={() => handleDelete(artikel.id_artikel)}
                  className="flex items-center px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                >
                  <FaTrash className="mr-2" />
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between mt-6 bg-white px-4 py-3 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600 mb-4 sm:mb-0">
            Menampilkan <span className="font-medium">{indexOfFirstArtikel + 1}-{Math.min(indexOfLastArtikel, filteredData.length)}</span> dari <span className="font-medium">{filteredData.length}</span> artikel
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

                  {/* Ellipsis or number */}
                  {currentPage > 3 && <span className="text-gray-400">...</span>}

                  {/* Current page and surrounding */}
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

                  {/* Ellipsis or number */}
                  {currentPage < totalPages - 2 && (
                    <span className="text-gray-400">...</span>
                  )}

                  {/* Last page */}
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

      {/* Image Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4"
             onClick={closeModal}>
          <div className="relative bg-white p-4 max-w-2xl rounded-lg">
            <img
              src={currentImage}
              alt="Fullscreen"
              className="w-full h-auto rounded-lg object-contain max-h-[70vh]"
            />
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 bg-white rounded-full p-1"
            >
              <BsFillXCircleFill className="text-lg" />
            </button>
          </div>
        </div>
      )}

      {/* Description Modal */}
      {showDescription && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4"
             onClick={closeDescriptionModal}>
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Detail Artikel</h3>
                <p className="text-gray-500 text-sm mt-1">Konten lengkap artikel</p>
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
    </div>
  );
};

export default ArtikelTable;