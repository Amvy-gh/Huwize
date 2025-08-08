import React, { useEffect, useState } from "react";
import { FaCheck, FaTimes, FaEye } from "react-icons/fa";
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
    });
  }, []);

  const indexOfLastLaporan = currentPage * laporansPerPage;
  const indexOfFirstLaporan = indexOfLastLaporan - laporansPerPage;
  const currentLaporans = laporanData.slice(indexOfFirstLaporan, indexOfLastLaporan);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Menghitung jumlah total halaman
  const pageCount = Math.ceil(laporanData.length / laporansPerPage);
  const paginationNumbers = Array.from({ length: pageCount }, (_, i) => i + 1);

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

  return (
    <div className="bg-gray-50 min-h-screen py-6 px-2">
      <div className="max-w-[95vw] mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center justify-center">
          <span className="border-b-4 border-green-500 pb-2">Data Laporan</span>
        </h2>

        {/* Desktop Table */}
        <div className="hidden md:block bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gradient-to-r from-green-700 to-green-800 text-white text-xs">
                  <th className="px-2 py-3 text-center font-medium w-[5%]">Id</th>
                  <th className="px-2 py-3 text-center font-medium w-[12%]">Tanggal</th>
                  <th className="px-2 py-3 text-center font-medium w-[8%]">Status</th>
                  <th className="px-2 py-3 text-center font-medium w-[12%]">Nama</th>
                  <th className="px-2 py-3 text-center font-medium w-[12%]">No Telepon</th>
                  <th className="px-2 py-3 text-center font-medium w-[15%]">Lokasi</th>
                  <th className="px-2 py-3 text-center font-medium w-[20%]">Deskripsi</th>
                  <th className="px-2 py-3 text-center font-medium w-[8%]">Gambar</th>
                  <th className="px-2 py-3 text-center font-medium w-[8%]">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {currentLaporans.map((laporan, index) => (
                  <tr key={laporan.id_laporan} 
                      className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} 
                      hover:bg-gray-100 transition-colors duration-150 text-xs`}>
                    <td className="px-2 py-2 text-center">{laporan.id_laporan}</td>
                    <td className="px-2 py-2 text-center">{laporan.tanggal_laporan}</td>
                    <td className="px-2 py-2 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          laporan.status === "Aktif"
                            ? "bg-green-100 text-green-700 border border-green-500"
                            : "bg-orange-100 text-orange-700 border border-orange-500"
                        }`}
                      >
                        {laporan.status}
                      </span>
                    </td>
                    <td className="px-2 py-2 text-center">{laporan.nama}</td>
                    <td className="px-2 py-2 text-center">{laporan.no_telepon}</td>
                    <td className="px-2 py-2 text-center">{laporan.lokasi_laporan}</td>
                    <td className="px-2 py-2 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <p className="truncate max-w-[150px]">
                          {laporan.deskripsi_laporan.slice(0, 50)}...
                        </p>
                        <button
                          onClick={() => openDescriptionModal(laporan.deskripsi_laporan)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <FaEye />
                        </button>
                      </div>
                    </td>
                    <td className="px-2 py-2 text-center">
                      {laporan.gambar_laporan ? (
                        <div className="flex justify-center items-center cursor-pointer" onClick={() => openModal(showGambarLaporan(laporan.gambar_laporan))}>
                          <img
                            src={showGambarLaporan(laporan.gambar_laporan)}
                            alt="Gambar Laporan"
                            className="w-12 h-12 rounded"
                          />
                        </div>
                      ) : (
                        <span className="text-gray-500">Tidak ada gambar</span>
                      )}
                    </td>
                    <td className="px-2 py-2 text-center">
                      {laporan.status === "Aktif" && (
                        <button
                          onClick={() => updateStatus(laporan.id_laporan, laporan.status)}
                          className="text-red-700 hover:text-red-900"
                          title="Nonaktif"
                        >
                          <FaTimes />
                        </button>
                      )}
                      {laporan.status === "Selesai" && (
                        <button
                          onClick={() => updateStatus(laporan.id_laporan, laporan.status)}
                          className="text-green-700 hover:text-green-900"
                          title="Aktif"
                        >
                          <FaCheck />
                        </button>
                      )}
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

        {/* Description Modal */}
        {showDescription && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            onClick={closeDescriptionModal}
          >
            <div className="bg-white rounded-lg p-6 max-w-2xl w-11/12 max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold">Detail Deskripsi Laporan</h3>
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

        {/* Mobile Cards */}
        <div className="grid gap-4 md:hidden">
          {currentLaporans.map((laporan) => (
            <div key={laporan.id_laporan} 
                 className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition-shadow duration-200">
              <div className="grid grid-cols-3 gap-y-2">
                <span className="font-semibold text-gray-700">ID Laporan</span>
                <span className="col-span-2">: {laporan.id_laporan}</span>

                <span className="font-semibold text-gray-700">Nama</span>
                <span className="col-span-2">: {laporan.nama}</span>

                <span className="font-semibold text-gray-700">No. Telepon</span>
                <span className="col-span-2">: {laporan.no_telepon}</span>

                <span className="font-semibold text-gray-700">Tanggal</span>
                <span className="col-span-2">: {formatDate(laporan.tanggal_laporan)}</span>

                <span className="font-semibold text-gray-700">Lokasi</span>
                <span className="col-span-2">: {laporan.lokasi_laporan}</span>

                <span className="font-semibold text-gray-700">Status</span>
                <span className="col-span-2">
                  :{" "}
                  <span
                    className={`px-2 py-1 rounded-full text-sm font-semibold ${
                      laporan.status === "Aktif"
                        ? "bg-green-100 text-green-700 border border-green-500"
                        : "bg-orange-100 text-orange-700 border border-orange-500"
                    }`}
                  >
                    {laporan.status}
                  </span>
                </span>

                <span className="font-semibold text-gray-700 col-span-3">Deskripsi</span>
                <span className="col-span-3 break-words text-gray-600">{laporan.deskripsi_laporan}</span>
              </div>

              {/* Gambar */}
              <div className="mt-4">
                <span className="font-semibold text-gray-700">Gambar</span>
                {laporan.gambar_laporan ? (
                  <div className="mt-2">
                    <img
                      src={showGambarLaporan(laporan.gambar_laporan)}
                      alt="Gambar Laporan"
                      className="w-full max-w-md h-auto rounded-lg object-cover border border-gray-300 shadow-md cursor-pointer"
                      onClick={() => openModal(showGambarLaporan(laporan.gambar_laporan))}
                    />
                  </div>
                ) : (
                  <span className="text-gray-500">: Tidak ada gambar</span>
                )}
              </div>

              {/* Tombol Aksi */}
              <div className="mt-4 flex justify-end">
                {laporan.status === "Aktif" && (
                  <button
                    onClick={() => updateStatus(laporan.id_laporan, laporan.status)}
                    className="px-4 py-2 text-sm font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 shadow-md"
                  >
                    Tandai Selesai
                  </button>
                )}
                {laporan.status === "Selesai" && (
                  <button
                    onClick={() => updateStatus(laporan.id_laporan, laporan.status)}
                    className="px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 shadow-md"
                  >
                    Tandai Belum Selesai
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-6 flex justify-center gap-2">
          <button
            className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
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
            className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
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

export default LaporanTable;
