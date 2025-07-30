import { FaTimes, FaExclamationCircle, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

const NotificationPopup = ({ reports, isOpen, onClose, onClickReport }) => {
  if (!isOpen) return null;

  return (
    <div className={`
      fixed transform transition-all duration-200 z-50
      md:top-8 md:right-48
      top-[4.5rem] right-4
      w-80 bg-white rounded-lg shadow-2xl border border-gray-200
    `}>
      <div className="p-3 border-b border-gray-200 bg-gray-50">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-base font-semibold text-gray-800">Notifikasi</h3>
            <p className="text-xs text-gray-500">Laporan yang belum ditindaklanjuti</p>
          </div>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700 p-1 hover:bg-gray-200 rounded-full transition-colors"
          >
            <FaTimes />
          </button>
        </div>
      </div>
      <div className="max-h-[50vh] overflow-y-auto">
        {reports.length > 0 ? (
          reports.map((report) => (
            <div
              key={report.id_laporan}
              onClick={() => onClickReport(report.id_laporan)}
              className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 transition-colors"
            >
              <div className="flex items-start gap-2">
                <div className="flex-shrink-0">
                  <div className="bg-yellow-100 p-1.5 rounded-full">
                    <FaExclamationCircle className="text-yellow-500 text-sm" />
                  </div>
                </div>
                <div className="flex-grow min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-800 truncate">{report.nama}</p>
                  </div>
                  <div className="flex items-center gap-1 mt-0.5 text-gray-600">
                    <FaMapMarkerAlt className="text-gray-400 text-xs flex-shrink-0" />
                    <p className="text-xs truncate">{report.lokasi_laporan}</p>
                  </div>
                  <p className="text-xs text-gray-600 mt-1 line-clamp-1">
                    {report.deskripsi_laporan}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <FaClock className="text-gray-400 text-xs" />
                    <span className="text-xs text-gray-500">Menunggu tindakan</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-4 text-center text-gray-500 flex flex-col items-center">
            <FaExclamationCircle className="text-gray-300 text-2xl mb-1" />
            <p className="text-sm">Tidak ada laporan yang perlu ditindaklanjuti</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationPopup;
