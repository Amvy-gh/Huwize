import { useState, useEffect } from "react";
import {
  FaFileAlt,
  FaUsers,
  FaClipboardCheck,
  FaPlus,
  FaList,
  FaEnvelope,
} from "react-icons/fa";
import { Link } from "react-router-dom";

import { getTotalArtikel } from "../../../services/Artikel/artikel.service";
import {
  getTotalLaporan,
  getLaporanSelesai,
} from "../../../services/Laporan/laporan.service";

import { totalWebVisitor } from "../../../services/Visitor/visitor.service";
import { getNewReports } from "../../../services/Notification/notification.service";

const AdminDashboard = () => {
  const [totalArtikel, setTotalArtikel] = useState([]);
  const [totalLaporan, setTotalLaporan] = useState([]);
  const [laporanSelesai, setLaporanSelesai] = useState([]);
  const [totalVisitor, setTotalVisitor] = useState([]);
  const [newReports, setNewReports] = useState(0);

  useEffect(() => {
    getTotalArtikel((data) => {
      if (Array.isArray(data.data)) {
        setTotalArtikel(data.data);
      } else {
        setTotalArtikel([{ total_artikel: 0 }]);
      }
    });
  }, []);

  useEffect(() => {
    getTotalLaporan((data) => {
      if (Array.isArray(data.data)) {
        setTotalLaporan(data.data);
      } else {
        setTotalLaporan([{ total_laporan: 0 }]);
      }
    });
  }, []);

  useEffect(() => {
    getLaporanSelesai((data) => {
      if (Array.isArray(data.data)) {
        setLaporanSelesai(data.data);
      } else {
        setLaporanSelesai([{ total_selesai: 0 }]);
      }
    });
  }, []);

  useEffect(() => {
    totalWebVisitor((data) => {
      if (Array.isArray(data.data)) {
        setTotalVisitor(data.data);
      } else {
        setTotalVisitor([{ total_visitor: 0 }]);
      }
    });
  }, []);

  useEffect(() => {
    getNewReports((data) => {
      setNewReports(data.count || 0);
    });
  }, []);

  return (
    <div className="flex bg-gray-50">
      <div className="flex-1 py-6 px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Selamat Datang, Admin!
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            Pantau aktivitas website dan kelola konten dari dashboard ini
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <Link
            to="/tambah-artikel"
            className="flex items-center justify-center p-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <FaPlus className="mr-2" />
            <span>Tambah Artikel</span>
          </Link>
          <Link
            to="/laporan-table"
            className="flex items-center justify-center p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FaList className="mr-2" />
            <span>Lihat Laporan</span>
          </Link>
        </div>

        {/* Notification for new reports */}
        {newReports > 0 && (
          <div className="mb-4">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <FaEnvelope className="h-5 w-5 text-yellow-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    Anda memiliki {newReports} laporan baru yang belum ditinjau
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Jumlah Artikel */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <FaFileAlt className="text-2xl text-green-600" />
              </div>
              <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
                Total Artikel
              </span>
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {totalArtikel[0]?.total_artikel || 0}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Artikel dipublikasikan
            </p>
          </div>
          {/* Jumlah Pengunjung */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <FaUsers className="text-2xl text-blue-600" />
              </div>
              <span className="text-sm font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                Pengunjung
              </span>
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {totalVisitor[0]?.total_visitor || 0}
            </p>
            <p className="text-sm text-gray-500 mt-1">Total pengunjung</p>
          </div>
          {/* Jumlah Laporan Masuk */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <FaClipboardCheck className="text-2xl text-yellow-600" />
              </div>
              <span className="text-sm font-medium text-yellow-600 bg-yellow-100 px-5 py-1 rounded-full">
                Laporan Masuk
              </span>
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {totalLaporan[0]?.total_laporan || 0}
            </p>
            <p className="text-sm text-gray-500 mt-1">Laporan baru masuk</p>
          </div>
          {/* Jumlah Laporan Tuntas */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-red-600 bg-red-100 px-5 py-1 rounded-full">
                Laporan Tuntas
              </span>
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {laporanSelesai[0]?.total_laporan_selesai || 0}
            </p>
            <p className="text-sm text-gray-500 mt-1">Laporan yang sudah ditindaklanjuti</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;