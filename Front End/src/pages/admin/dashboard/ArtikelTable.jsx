import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaPlus, FaEye } from "react-icons/fa";
import { BsFillXCircleFill } from 'react-icons/bs';
import { Link, useNavigate } from "react-router-dom";
import { deleteArtikel, getArtikel, showGambar } from "../../../services/Artikel/artikel.service";

const ArtikelTable = () => {
  const navigate = useNavigate();
  const [artikelData, setArtikelData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [artikelsPerPage] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState("");
  const [showDescription, setShowDescription] = useState(false);
  const [selectedDescription, setSelectedDescription] = useState("");

  // Fetch data artikel saat komponen pertama kali dirender
  useEffect(() => {
    getArtikel((data) => {
      setArtikelData(data.data);
    });
  }, []);

  const indexOfLastArtikel = currentPage * artikelsPerPage;
  const indexOfFirstArtikel = indexOfLastArtikel - artikelsPerPage;
  const currentArticles = artikelData.slice(indexOfFirstArtikel, indexOfLastArtikel);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageCount = Math.ceil(artikelData.length / artikelsPerPage);
  const paginationNumbers = Array.from({ length: pageCount }, (_, i) => i + 1);

  const handleDelete = (id) => {
    deleteArtikel(id)
      .then(() => {
        setArtikelData((prevData) => prevData.filter((artikel) => artikel.id_artikel !== id));
      })
      .catch((error) => {
        console.error("Error saat menghapus artikel:", error);
      });
  };

  // Set imagehhhh
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
    <div className="bg-gray-50 min-h-screen py-6 px-2">
      <div className="max-w-[95vw] mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center justify-center">
          <span className="border-b-4 border-green-500 pb-2">Data Artikel</span>
        </h2>

        {/* Desktop Table */}
        <div className="hidden md:block bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gradient-to-r from-green-700 to-green-800 text-white text-xs">
                  <th className="px-2 py-3 text-center font-medium w-[5%]">Id</th>
                  <th className="px-2 py-3 text-center font-medium w-[10%]">Tanggal</th>
                  <th className="px-2 py-3 text-center font-medium w-[15%]">Judul</th>
                  <th className="px-2 py-3 text-center font-medium w-[10%]">Author</th>
                  <th className="px-2 py-3 text-center font-medium w-[25%]">Isi</th>
                  <th className="px-2 py-3 text-center font-medium w-[15%]">Sumber</th>
                  <th className="px-2 py-3 text-center font-medium w-[10%]">Gambar</th>
                  <th className="px-2 py-3 text-center font-medium w-[10%]">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {currentArticles.map((artikel, index) => (
                  <tr key={artikel.id_artikel} 
                      className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} 
                      hover:bg-gray-100 transition-colors duration-150 text-xs`}>
                    <td className="px-2 py-2 text-center border-b break-words max-w-[50px]">{artikel.id_artikel}</td>
                    <td className="px-2 py-2 text-center border-b break-words max-w-[100px]">{artikel.tanggal_artikel}</td>
                    <td className="px-2 py-2 text-center border-b break-words max-w-[150px]">{artikel.judul_artikel.slice(0, 50)}...</td>
                    <td className="px-2 py-2 text-center border-b break-words max-w-[100px]">{artikel.author.slice(0, 50)}...</td>
                    <td className="px-2 py-2 text-center border-b break-words max-w-[200px]">
                      <div className="flex items-center justify-center space-x-2">
                        <p className="truncate max-w-[200px]">
                          {artikel.isi_artikel.slice(0, 50)}...
                        </p>
                        <button
                          onClick={() => openDescriptionModal(artikel.isi_artikel)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <FaEye />
                        </button>
                      </div>
                    </td>
                    <td className="px-2 py-2 text-center border-b break-words max-w-[100px]">{artikel.sumber_artikel.slice(0, 50)}...</td>
                    <td className="px-2 py-2 border-b">
                      {artikel.gambar_artikel ? (
                        <div className="flex justify-center items-center cursor-pointer" onClick={() => openModal(showGambar(artikel.gambar_artikel))}>
                          <img src={showGambar(artikel.gambar_artikel)} 
                          alt="Gambar Artikel" 
                          className="w-12 h-12 rounded" 
                          />
                        </div>
                      ) : (
                        <span className="text-gray-500">Tidak ada gambar</span>
                      )}
                    </td>
                    <td className="px-2 py-2 text-center border-b space-x-2">
                      <button className="text-blue-700 hover:text-blue-900" title="Edit" onClick={() => navigate(`/update-artikel/${artikel.id_artikel}`)}>
                        <FaEdit />
                      </button>
                      <button className="text-red-700 hover:text-red-900" title="Hapus" onClick={() => handleDelete(artikel.id_artikel)}>
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="relative bg-white p-4 max-w-lg">
              <img
                src={currentImage}
                alt="Fullscreen"
                className="w-full h-auto rounded-lg object-contain"
              />
              <button
                onClick={closeModal}
                className="top-1 right-1 text-green-black text-2xl absolute"
              >
                <BsFillXCircleFill />
              </button>
            </div>
          </div>
        )}

        {/* Description Modal with click outside handler */}
        {showDescription && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            onClick={closeDescriptionModal}
          >
            <div className="bg-white rounded-lg p-6 max-w-2xl w-11/12 max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold">Detail Isi Artikel</h3>
                <button
                  onClick={() => setShowDescription(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <BsFillXCircleFill className="text-xl" />
                </button>
              </div>
              <p className="text-gray-600 whitespace-pre-wrap">{selectedDescription}</p>
            </div>
          </div>
        )}

        {/* Tabel Mobile */}
        <div className="block md:hidden space-y-4">
          {currentArticles.map((artikel) => (
            <div key={artikel.id_artikel} className="bg-white shadow-lg rounded-lg p-4 max-w-sm mx-auto">
              <div className="grid grid-cols-3 gap-y-1 gap-x-2">
                <span className="font-semibold text-gray-700">ID Artikel</span>
                <span className="col-span-2 break-words">: {artikel.id_artikel}</span>

                <span className="font-semibold text-gray-700">Tanggal</span>
                <span className="col-span-2 break-words">: {artikel.tanggal_artikel}</span>

                <span className="font-semibold text-gray-700">Judul</span>
                <span className="col-span-2 break-words">: {artikel.judul_artikel}</span>

                <span className="font-semibold text-gray-700">Author</span>
                <span className="col-span-2 break-words">: {artikel.author}</span>

                <span className="font-semibold text-gray-700">Sumber</span>
                <span className="col-span-2 break-words">: {artikel.sumber_artikel}</span>

                <span className="font-semibold text-gray-700 col-span-3 mt-4">Deskripsi</span>
                <span className="col-span-3 break-words text-gray-600">{artikel.isi_artikel.slice(0, 100)}...</span>
              </div>

              <div className="mt-4">
                <Link
                  to={`/artikel/isi-artikel/${artikel.id_artikel}`}
                  className="text-blue-600 hover:underline"
                >
                  Lihat Artikel
                </Link>
              </div>

              <div className="mt-4">
                <span className="font-semibold text-gray-700">Gambar Artikel</span>
                {artikel.gambar_artikel ? (
                  <div className="mt-2 flex justify-center">
                    <img
                      src={showGambar(artikel.gambar_artikel)}
                      alt="Gambar Artikel"
                      className="w-full max-w-xs h-auto rounded-lg object-cover border border-gray-300 shadow-md"
                    />
                  </div>
                ) : (
                  <span className="text-gray-500">: Tidak ada gambar</span>
                )}
              </div>

              <div className="mt-4 flex justify-end">
                <div className="space-x-2">
                  <button
                    onClick={() => navigate(`/update-artikel/${artikel.id_artikel}`)}
                    className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-md"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(artikel.id_artikel)}
                    className="px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 shadow-md"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tombol Tambah Artikel */}
        <div className="mt-6 flex justify-center">
          <button 
            onClick={() => navigate("/tambah-artikel")} 
            className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 shadow-md"
          >
            <FaPlus className="mr-2" /> Tambah Artikel Baru
          </button>
        </div>

        {/* Pagination */}
        <div className="flex flex-wrap justify-center items-center mt-8 mr-5 space-x-2 sm:space-x-4">
          <button
            className="px-3 py-1 text-sm sm:px-4 sm:py-2 text-white bg-green-700 border-2 border-green-700 rounded-lg hover:bg-green-800 disabled:bg-green-700 min-w-[70px]"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {paginationNumbers.map((number) => (
            <button
              key={number}
              className={`px-3 py-1 text-sm sm:px-4 sm:py-2 font-semibold rounded-lg ${currentPage === number ? "bg-green-500 text-white" : "bg-white text-green-700 border-2 border-green-700 hover:bg-green-700 hover:text-white"}`}
              onClick={() => paginate(number)}
            >
              {number}
            </button>
          ))}
          <button
            className="px-3 py-1 text-sm sm:px-4 sm:py-2 text-white bg-green-700 border-2 border-green-700 rounded-lg hover:bg-green-800 disabled:bg-green-700 min-w-[70px]"
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === pageCount}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArtikelTable;
