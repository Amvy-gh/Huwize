import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaEnvelope } from "react-icons/fa";
import { getNewReports } from "../../services/Notification/notification.service";

const AdminNavbar = ({ toggleSidebar }) => {
  const [newReportsCount, setNewReportsCount] = useState(0);

  useEffect(() => {
    const fetchNewReports = () => {
      getNewReports((data) => {
        setNewReportsCount(data.count);
      });
    };

    fetchNewReports();
    const interval = setInterval(fetchNewReports, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="bg-white shadow-sm">
      <div className="px-4 h-16 flex justify-between items-center">
        <button
          onClick={toggleSidebar}
          className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600 md:hidden"
        >
          <FaBars className="h-6 w-6" />
        </button>

        <div className="flex items-center">
          <Link to="/laporan-table" className="relative">
            <FaEnvelope className="h-6 w-6 text-gray-500 hover:text-gray-600 cursor-pointer" />
            {newReportsCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {newReportsCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
