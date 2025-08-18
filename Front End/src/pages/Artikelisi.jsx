import { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  getArtikelById,
  showGambar,
} from "../services/Artikel/artikel.service";

const FadeIn = (delay) => ({
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: delay, ease: "easeInOut" },
  },
});

const IsiArtikel = () => {
  const { id } = useParams();
  const [artikelData, setArtikelData] = useState(null);

  useEffect(() => {
    getArtikelById(id, (data) => {
      setArtikelData(data);
    });
  }, [id]);

  if (!artikelData || !artikelData.data || artikelData.data.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-6">
            <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Memuat Artikel</h2>
          <p className="text-gray-600">Mohon tunggu sebentar...</p>
        </div>
      </div>
    );
  }

  const artikel = artikelData.data[0];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
        <Navbar variant="bg-emerald-800 shadow-lg" variant2="mt-0 py-2" />

        {/* Background Pattern */}
        <div
          className="fixed inset-0 opacity-5 z-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23059669' fill-opacity='0.3'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Breadcrumb */}
          <motion.nav
            variants={FadeIn(0)}
            initial="initial"
            animate="animate"
            className="flex items-center space-x-2 text-sm text-gray-600 mb-8 bg-white/60 backdrop-blur-sm rounded-full px-6 py-3 w-fit shadow-sm border border-emerald-100"
          >
            <Link to="/" className="hover:text-emerald-600 transition-colors duration-200 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Home
            </Link>
            <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <Link to="/artikel" className="hover:text-emerald-600 transition-colors duration-200">Artikel</Link>
            <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-emerald-600 font-medium">Detail Artikel</span>
          </motion.nav>

          {/* Article Header */}
          <motion.div
            variants={FadeIn(0.1)}
            initial="initial"
            animate="animate"
            className="text-center mb-12"
          >
            <div className="mb-6">
              <span className="inline-flex items-center px-4 py-2 bg-emerald-100 text-emerald-800 text-sm font-semibold rounded-full break-words">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                Artikel
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight break-words">
              {artikel.judul_artikel}
            </h1>

            <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-green-500 mx-auto"></div>
          </motion.div>

          {/* Featured Image */}
          <motion.div
            variants={FadeIn(0.2)}
            initial="initial"
            animate="animate"
            className="relative mb-12 group"
          >
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <img
                className="w-full h-64 sm:h-80 lg:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                src={showGambar(artikel.gambar_artikel)}
                alt={artikel.judul_artikel}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </motion.div>

          {/* Article Meta */}
          <motion.div
            variants={FadeIn(0.3)}
            initial="initial"
            animate="animate"
            className="mb-12"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg border border-emerald-100">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between space-y-4 sm:space-y-0">

                {/* Penulis */}
                <div className="flex items-start sm:items-center space-x-4 w-full sm:w-1/2">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0 break-words">
                    <p className="text-sm text-gray-600">Penulis Artikel</p>
                    <p className="font-semibold text-gray-900 break-words">{artikel.author}</p>
                  </div>
                </div>

                {/* Sumber */}
                <div className="flex items-start sm:items-center space-x-4 w-full sm:w-1/2">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0 break-words">
                    <p className="text-sm text-gray-600">Sumber Artikel</p>
                    <a
                      className="font-semibold text-blue-600 hover:text-blue-800 hover:underline break-words"
                      href={artikel.sumber_artikel}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Lihat Sumber
                    </a>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>

          {/* Article Content */}
          <motion.article
            variants={FadeIn(0.4)}
            initial="initial"
            animate="animate"
            className="prose prose-lg max-w-none"
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 sm:p-12 shadow-xl border border-emerald-100 relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500"></div>
              <div className="absolute top-4 right-4 w-16 h-16 bg-emerald-50 rounded-full opacity-50"></div>
              <div className="absolute bottom-4 left-4 w-24 h-24 bg-green-50 rounded-full opacity-30"></div>

              <div className="relative z-10">
                <div
                  className="text-gray-800 leading-relaxed text-lg selection:bg-emerald-100 selection:text-emerald-900 break-words"
                  style={{ whiteSpace: "pre-wrap", lineHeight: "1.9" }}
                >
                  {artikel.isi_artikel.split('\n\n').map((paragraph, index) => {
                    if (!paragraph.trim()) return null;

                    return (
                      <div key={index} className="mb-8">
                        <p className={`text-justify leading-relaxed break-words ${
                          index === 0
                            ? "first-letter:text-7xl first-letter:font-bold first-letter:text-emerald-600 first-letter:float-left first-letter:mr-4 first-letter:mt-2 first-letter:leading-none first-letter:drop-shadow-lg"
                            : ""
                        }`}>
                          {paragraph.trim()}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.article>

          {/* Call to Action */}
          <motion.div
            variants={FadeIn(0.5)}
            initial="initial"
            animate="animate"
            className="mt-16"
          >
            <div className="bg-gradient-to-br from-emerald-600 via-green-600 to-teal-600 rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>

              <div className="relative z-10 text-center">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold mb-4">Tertarik dengan artikel lainnya?</h3>
                  <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
                    Jelajahi koleksi artikel menarik lainnya yang telah kami siapkan khusus untuk menambah wawasan Anda
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Link
                    to="/artikel"
                    className="inline-flex items-center px-8 py-4 bg-white text-emerald-600 font-bold rounded-full hover:bg-gray-50 transform hover:scale-105 hover:shadow-lg transition-all duration-300 shadow-xl"
                  >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                    </svg>
                    Kembali ke Artikel
                  </Link>

                  <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="inline-flex items-center px-6 py-4 bg-white/20 text-white font-semibold rounded-full hover:bg-white/30 transition-all duration-300 backdrop-blur-sm"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                    Kembali ke Atas
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="h-2 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500"></div>
      <Footer />
    </>
  );
};

export default IsiArtikel;
