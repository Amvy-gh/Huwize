import { useState, useEffect, useRef } from 'react';
import Sidebar from '../Sidebar/Sidebar.jsx';
import { Outlet, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaBars } from 'react-icons/fa';
import { getNewReports, getActiveReports } from "../../services/Notification/notification.service";
import NotificationPopup from '../Notification/NotificationPopup';

const Layout = () => {
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [newReportsCount, setNewReportsCount] = useState(0);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [newReports, setNewReports] = useState([]);
  const [activeReports, setActiveReports] = useState([]);
  const notificationRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchNewReports = () => {
      getNewReports((data) => {
        setNewReportsCount(data.count || 0);
      });
    };

    fetchNewReports();
    const interval = setInterval(fetchNewReports, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isNotificationOpen) {
      getActiveReports((data) => {
        setActiveReports(data.data || []);
      });
    }
  }, [isNotificationOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsNotificationOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleNotificationClick = (e) => {
    e.preventDefault();
    setIsNotificationOpen(!isNotificationOpen);
  };

  const handleReportClick = (reportId) => {
    setIsNotificationOpen(false);
    navigate('/laporan-table');
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 w-60 z-40 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 transition-transform`}>
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      </div>

      {/* Mobile */}
      {isSidebarOpen && windowWidth < 768 && (
        <div className="fixed inset-0 bg-black opacity-50 z-30" onClick={toggleSidebar}></div>
      )}

      <div className="flex-1 flex flex-col md:ml-60">
        {/* Header Bar */}
        <div className="text-gray-800 flex items-center justify-between p-4 md:px-10 bg-white shadow-sm">
          <button className="md:hidden text-3xl text-black" onClick={toggleSidebar}>
            <FaBars />
          </button>
          <div className="flex items-center space-x-4">
            <div className={`text-xl font-bold ${windowWidth < 768 ? "ml-5" : ""}`}>
              <span className="text-secondary2">Hu</span>Wize
            </div>
          </div>
          <div className="flex items-center space-x-4" ref={notificationRef}>
            <button 
              className="relative bg-white hover:bg-gray-100 text-green-800 p-2 rounded-full mr-2 md:mr-0 transition-colors"
              onClick={handleNotificationClick}
            >
              <FaEnvelope className="w-5 h-5 md:w-6 md:h-6" />
              {newReportsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  {newReportsCount}
                </span>
              )}
            </button>
            <NotificationPopup
              reports={activeReports}
              isOpen={isNotificationOpen}
              onClose={() => setIsNotificationOpen(false)}
              onClickReport={handleReportClick}
            />
            {windowWidth >= 768 && (
              <div className="flex items-center">
                <span className="ml-0 mr-7 text-4xl font-bold md:text-lg">ADMIN</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 p-4 md:px-10 bg-gray-100 overflow-y-auto h-screen">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;