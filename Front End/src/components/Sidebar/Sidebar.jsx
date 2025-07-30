import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaNewspaper,
  FaClipboardList,
  FaSignOutAlt,
  FaTimes,
} from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { LogoutHandler } from "../../services/adminAuth/adminLogout.service";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? "bg-green-700 text-white" : "text-white";
  };

  return (
    <div
      className={`fixed inset-y-0 left-0 w-64 bg-gradient-to-br from-green-800 to-green-900 text-white transition-transform transform duration-300 ease-in-out shadow-2xl ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 h-full z-40`}
    >
      <div className="flex justify-between items-center p-6 border-b border-green-700/50">
        <div className="flex items-center space-x-3">
          <img src="assets/EcoBanjar_logoicon_nobg.png" className="h-12 w-auto rounded-lg" alt="Logo Huwize" />
          <div className="text-left">
            <div className="text-2xl font-bold text-white/90">ADMIN</div>
            <div className="text-sm text-white/60">Dashboard Panel</div>
          </div>
        </div>
        <button
          className="text-white/70 hover:text-white md:hidden"
          onClick={toggleSidebar}
        >
          <FaTimes className="text-xl" />
        </button>
      </div>

      <nav className="flex flex-col space-y-2 px-4 py-6">
        <Link
          to="/Admin-Dashboard"
          className={`sidebar-link flex items-center px-4 py-3 text-base rounded-lg transition-all duration-200 
            ${location.pathname === '/Admin-Dashboard' 
              ? 'bg-white/10 text-white font-semibold shadow-lg' 
              : 'text-white/70 hover:bg-white/5 hover:text-white'}`}
        >
          <FaHome className="mr-3 text-lg" /> Dashboard
        </Link>
        <Link
          to="artikel-table"
          className={`sidebar-link flex items-center px-4 py-3 text-base rounded-lg transition-all duration-200 
            ${location.pathname === '/artikel-table' 
              ? 'bg-white/10 text-white font-semibold shadow-lg' 
              : 'text-white/70 hover:bg-white/5 hover:text-white'}`}
        >
          <FaNewspaper className="mr-3 text-lg" /> Artikel
        </Link>
        <Link
          to="laporan-table"
          className={`sidebar-link flex items-center px-4 py-3 text-base rounded-lg transition-all duration-200 
            ${location.pathname === '/laporan-table' 
              ? 'bg-white/10 text-white font-semibold shadow-lg' 
              : 'text-white/70 hover:bg-white/5 hover:text-white'}`}
        >
          <FaClipboardList className="mr-3 text-lg" /> Laporan
        </Link>
        <Link
          to="/"
          className={`sidebar-link flex items-center px-4 py-3 text-base rounded-lg transition-all duration-200 
            ${location.pathname === '/' 
              ? 'bg-white/10 text-white font-semibold shadow-lg' 
              : 'text-white/70 hover:bg-white/5 hover:text-white'}`}
        >
          <IoMdArrowRoundBack className="mr-3 text-lg" />{" "}
          <p className="text-lg">Kembali Ke Beranda</p>
        </Link>
      </nav>

      <div className="absolute bottom-0 w-full p-4 border-t border-green-700/50">
        <button 
          onClick={LogoutHandler}
          className="w-full flex items-center justify-center px-4 py-3 text-sm font-medium text-white bg-red-500/80 hover:bg-red-600 rounded-lg transition-colors duration-200"
        >
          <FaSignOutAlt className="mr-2" /> Keluar
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

