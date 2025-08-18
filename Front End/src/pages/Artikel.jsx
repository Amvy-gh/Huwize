import Navbar from "../components/Navbar/Navbar";
import { useEffect, useState } from "react";
import Footer from "../components/Footer/Footer";
import { motion } from "framer-motion";
import { getArtikel, showGambar } from "../services/Artikel/artikel.service";
import { Link } from "react-router-dom";

const SlideUp = (delay) => ({
  initial: { opacity: 0, y: 50 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: delay, ease: "easeInOut" },
  },
});

const FadeIn = (delay) => ({
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.6, delay: delay, ease: "easeInOut" },
  },
});

const Artikel = () => {
  const [artikelData, setArtikelData] = useState([]);

  useEffect(() => {
    getArtikel((data) => {
      setArtikelData(data.data);
    });
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
        <Navbar variant="bg-emerald-800 shadow-lg" variant2="mt-0 py-2" />
        
        {/* Hero Section dengan Pattern Background */}
        <div className="relative overflow-hidden">
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23059669' fill-opacity='0.3'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}
          />
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Header Section */}
            <motion.div
              variants={FadeIn(0)}
              initial="initial"
              animate="animate"
              className="text-center mb-16"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-emerald-800 mb-4">
                Artikel <span className="text-green-600">Terbaru</span>
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-green-500 mx-auto mb-6"></div>
              <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
                Temukan wawasan terbaru dan informasi menarik dalam koleksi artikel pilihan kami
              </p>
            </motion.div>

            {/* Featured Article */}
            {artikelData.length > 0 && (
              <motion.div
                variants={SlideUp(0.2)}
                initial="initial"
                animate="animate"
                className="relative mb-16"
              >
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-emerald-100 hover:shadow-3xl transition-all duration-500 group">
                  <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500"></div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                    <div className="relative overflow-hidden">
                      <img
                        src={showGambar(artikelData[0].gambar_artikel)}
                        alt="Featured Article"
                        className="w-full h-64 lg:h-80 object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-emerald-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                          ✨ Featured
                        </span>
                      </div>
                    </div>

                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                      <div className="mb-4">
                        <div className="flex items-center space-x-2 text-emerald-600 mb-3">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-sm font-medium uppercase tracking-wide">Artikel Utama</span>
                        </div>
                      </div>
                      
                      <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6 leading-tight break-words hyphens-auto overflow-hidden">
                        {artikelData[0].judul_artikel}
                      </h2>
                      
                      <p className="text-gray-600 mb-8 text-lg leading-relaxed break-words overflow-hidden">
                        {artikelData[0].isi_artikel.slice(0, 200)}...
                      </p>

                      <Link
                        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white font-semibold rounded-full hover:from-emerald-700 hover:to-green-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl w-fit"
                        to={`isi-artikel/${artikelData[0].id_artikel}`}
                      >
                        Baca Selengkapnya
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {artikelData.slice(1).map((artikel, index) => (
                <motion.div
                  key={artikel.id_artikel}
                  variants={SlideUp(0.3 + index * 0.1)}
                  initial="initial"
                  animate="animate"
                  className="group"
                >
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-green-100 hover:shadow-2xl hover:border-emerald-200 transition-all duration-500 h-full flex flex-col">
                    <div className="relative overflow-hidden">
                      <img
                        src={showGambar(artikel.gambar_artikel)}
                        alt={artikel.judul_artikel}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    
                    <div className="p-6 flex-grow flex flex-col">
                      <div className="mb-3">
                        <div className="flex items-center space-x-2 text-emerald-600 mb-2">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                          <span className="text-xs font-medium uppercase tracking-wide">Artikel</span>
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-emerald-700 transition-colors duration-300 break-words hyphens-auto">
                        {artikel.judul_artikel}
                      </h3>
                      
                      <p className="text-gray-600 mb-6 flex-grow leading-relaxed break-words overflow-hidden">
                        {artikel.isi_artikel.slice(0, 150)}...
                      </p>

                      <Link
                        className="inline-flex items-center text-emerald-600 hover:text-emerald-800 font-semibold group-hover:underline transition-all duration-300 mt-auto"
                        to={`isi-artikel/${artikel.id_artikel}`}
                      >
                        Baca Artikel
                        <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Empty State */}
            {artikelData.length === 0 && (
              <motion.div
                variants={FadeIn(0.3)}
                initial="initial"
                animate="animate"
                className="text-center py-16"
              >
                <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-12 h-12 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Memuat Artikel...</h3>
                <p className="text-gray-600">Mohon tunggu sebentar, kami sedang memuat artikel terbaru untuk Anda.</p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Artikel;