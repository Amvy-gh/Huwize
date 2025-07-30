import React from 'react';
import { FaTimes, FaExclamationCircle, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

const NotificationPopup = ({ reports, isOpen, onClose, onClickReport }) => {
  if (!isOpen) return null;

  const getTimeAgo = (date) => {
    const now = new Date();
    const reportDate = new Date(date);
    const diff = now - reportDate;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} hari yang lalu`;
    if (hours > 0) return `${hours} jam yang lalu`;
    if (minutes > 0) return `${minutes} menit yang lalu`;
    return 'Baru saja';
  };

  return (
    <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-2xl z-50 border border-gray-200 transform transition-all duration-200">
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Notifikasi</h3>
            <p className="text-xs text-gray-500 mt-1">Laporan yang belum ditindaklanjuti</p>
          </div>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700 p-1 hover:bg-gray-200 rounded-full transition-colors"
          >
            <FaTimes />
          </button>
        </div>
      </div>
      <div className="max-h-[70vh] overflow-y-auto">
        {reports.length > 0 ? (
          reports.map((report) => (
            <div
              key={report.id_laporan}
              onClick={() => onClickReport(report.id_laporan)}
              className="p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <div className="bg-yellow-100 p-2 rounded-full">
                    <FaExclamationCircle className="text-yellow-500" />
                  </div>
                </div>
                <div className="flex-grow min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-gray-800 truncate">{report.nama}</p>
                    <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                      {getTimeAgo(report.tanggal_laporan)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 mt-1 text-gray-600">
                    <FaMapMarkerAlt className="text-gray-400 flex-shrink-0" />
                    <p className="text-sm truncate">{report.lokasi_laporan}</p>
                  </div>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                    {report.deskripsi_laporan}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <FaClock className="text-gray-400" />
                    <span className="text-xs text-gray-500">Menunggu tindakan</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center text-gray-500 flex flex-col items-center">
            <FaExclamationCircle className="text-gray-300 text-4xl mb-2" />
            <p>Tidak ada laporan yang perlu ditindaklanjuti</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationPopup;
