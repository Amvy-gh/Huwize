import React, { useState, useMemo } from 'react';
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const PemetaanSampah = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const data = [
    {
      no: 1,
      utmx: 532651,
      utmy: 9408900,
      deskripsi: "TITIK1",
      titik: "TITIK1",
      alamat: "M72V+WVW Jl. Ratu dibalau, Way Huwi, Kabupaten Lampung Selatan, Lampung",
      link: "https://www.google.com/maps?q=-5.3476406597822805,105.29469914659398",
    },
    {
      no: 2,
      utmx: 532545,
      utmy: 9408125,
      deskripsi: "TITIK2",
      titik: "TITIK2",
      alamat: "J7WV+4FQ Gg. Kenangan 4, Way Huwi, Kabupaten Lampung Selatan, Lampung",
      link: "https://www.google.com/maps?q=-5.354652081722599,105.29374577207854",
    },
    {
      no: 3,
      utmx: 532507,
      utmy: 9407299,
      deskripsi: "TITIK3",
      titik: "TITIK3",
      alamat: "J7QV+49V Jl. Pulau raya, Way Huwi, Kabupaten Lampung Selatan, Lampung",
      link: "https://www.google.com/maps?q=-5.362124574172883,105.29340635869845",
    },
    {
      no: 4,
      utmx: 532667,
      utmy: 9407332,
      deskripsi: "TITIK4",
      titik: "TITIK4",
      alamat: "J7QV+7W9 Jl. Pulau panggung, Way Huwi, Kabupaten Lampung Selatan, Lampung",
      link: "https://www.google.com/maps?q=-5.361825348604669,105.29485035357537",
    },
    {
      no: 5,
      utmx: 532733,
      utmy: 9407293,
      deskripsi: "TITIK5",
      titik: "TITIK5",
      alamat: "J7QW+45P Jl. Pulau panggung, Way Huwi, Kabupaten Lampung Selatan, Lampung",
      link: "https://www.google.com/maps?q=-5.3621778707703704,105.29544622982475",
    },
    {
      no: 6,
      utmx: 532326,
      utmy: 9406842,
      deskripsi: "TITIK6",
      titik: "TITIK6",
      alamat: "J7MR+GP2 Jl. Raden saleh, Way Huwi, Kabupaten Lampung Selatan, Lampung",
      link: "https://www.google.com/maps?q=-5.366259561124538,105.29177464095545",
    },
    {
      no: 7,
      utmx: 533554,
      utmy: 9408205,
      deskripsi: "TITIK7",
      titik: "TITIK7",
      alamat: "J8W3+C4Q Jl. Airan II, Way Huwi, Kabupaten Lampung Selatan, Lampung",
      link: "https://www.google.com/maps?q=-5.353923935263222,105.30285239775512",
    },
    {
      no: 8,
      utmx: 533775,
      utmy: 9408066,
      deskripsi: "TITIK8",
      titik: "TITIK8",
      alamat: "J8V3+WWQ Jl. Airan I, Way Huwi, Kabupaten Lampung Selatan, Lampung",
      link: "https://www.google.com/maps?q=-5.355180394688283,105.30484770806376",
    },
    {
      no: 9,
      utmx: 533916,
      utmy: 9408128,
      deskripsi: "TITIK9",
      titik: "TITIK9",
      alamat: "J8W4+5C5 Jl. Lapas raya, Way Huwi, Kabupaten Lampung Selatan, Lampung",
      link: "https://www.google.com/maps?q=-5.35461888363227,105.30612006004982",
    },
    {
      no: 10,
      utmx: 533450,
      utmy: 9407743,
      deskripsi: "TITIK10",
      titik: "TITIK10",
      alamat: "J8R2+QQ3 Jl. Airan raya, Way Huwi, Kabupaten Lampung Selatan, Lampung",
      link: "https://www.google.com/maps?q=-5.35810383338053,105.3019157722658",
    },
    {
      no: 11,
      utmx: 532627,
      utmy: 9407823,
      deskripsi: "TITIK11",
      titik: "TITIK11",
      alamat: "J7VV+2QX Gg. Madrasah, Way Huwi, Kabupaten Lampung Selatan, Lampung",
      link: "https://www.google.com/maps?q=-5.35738373972222,105.29448719161921",
    },
    {
      no: 12,
      utmx: 532507,
      utmy: 9407526,
      deskripsi: "TITIK12",
      titik: "TITIK12",
      alamat: "J7QV+XW6 Jl. Swadaya, Way Huwi, Kabupaten Lampung Selatan, Lampung",
      link: "https://www.google.com/maps?q=-5.360071041093999,105.29340537839363",
    },
    {
      no: 13,
      utmx: 533032,
      utmy: 9407485,
      deskripsi: "TITIK13",
      titik: "TITIK13",
      alamat: "J7QX+R7C Jl. Raden saleh, Way Huwi, Kabupaten Lampung Selatan, Lampung",
      link: "https://www.google.com/maps?q=-5.3604396530997995,105.29814411992358",
    },
    {
      no: 14,
      utmx: 533014,
      utmy: 9408757,
      deskripsi: "TITIK14",
      titik: "TITIK14",
      alamat: "M72X+C5Q Gg. Al-ikhlas 1, Way Huwi, Kabupaten Lampung Selatan, Lampung",
      link: "https://www.google.com/maps?q=-5.348932712241683,105.29797608282263",
    },
    {
      no: 15,
      utmx: 533254,
      utmy: 9408605,
      deskripsi: "TITIK15",
      titik: "TITIK15",
      alamat: "J8X2+V3C Gg. Damar, Way Huwi, Kabupaten Lampung Selatan, Lampung",
      link: "https://www.google.com/maps?q=-5.350306708473834,105.30014291261709",
    },
    {
      no: 16,
      utmx: 532622,
      utmy: 9407347,
      deskripsi: "TITIK16",
      titik: "TITIK16",
      alamat: "J7QV+8QG Jl. Swadaya, Way Huwi, Kabupaten Lampung Selatan, Lampung",
      link: "https://www.google.com/maps?q=-5.361689848228482,105.29444412493234",
    },
  ];

  // Filter dan pagination
  const filteredData = useMemo(() => {
    return data.filter(item =>
      item.alamat.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.titik.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.deskripsi.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      <Navbar variant="bg-emerald-800 shadow-lg" variant2="mt-0 py-2" />

      {/* Hero Section dengan Banner */}
      <div className="relative w-full bg-gradient-to-r from-emerald-600 to-teal-600 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center text-white">
          <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">
            Pemetaan Sampah
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto drop-shadow-md">
            Sistem informasi lokasi titik sampah di wilayah Way Huwi, Kabupaten Lampung Selatan
          </p>
          <div className="inline-flex items-center bg-white/10 backdrop-blur-md rounded-full px-6 py-3 text-sm font-medium">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            {data.length} Titik Pemetaan Tersedia
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full"></div>
          <div className="absolute top-32 right-20 w-16 h-16 bg-white/5 rounded-full"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white/10 rounded-full"></div>
        </div>
      </div>

      {/* Peta Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-16">
          <div className="bg-gradient-to-r from-emerald-700 to-emerald-800 px-8 py-6">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <svg className="w-7 h-7 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              Peta Lokasi Pemetaan Sampah
            </h2>
            <p className="text-emerald-100 mt-2">
              Visualisasi geografis seluruh titik pemetaan sampah di wilayah Way Huwi
            </p>
          </div>
          
          <div className="p-8">
            <div className="relative bg-gray-50 rounded-2xl overflow-hidden shadow-inner">
              <img
                src="/assets/peta.png"
                alt="Peta Lokasi Pemetaan Sampah Way Huwi"
                className="w-full h-auto object-contain max-h-[600px] mx-auto transition-transform duration-300 hover:scale-105"
                style={{ imageRendering: 'high-quality' }}
              />
              
              {/* Scale Indicator */}
              <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-md">
                <div className="text-xs font-medium text-gray-600">
                  Way Huwi, Lampung Selatan
                </div>
              </div>
            </div>
            
            {/* Map Description */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-emerald-50 rounded-xl p-6 border-l-4 border-emerald-500">
                <h3 className="font-semibold text-emerald-800 mb-2 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Informasi Peta
                </h3>
                <p className="text-emerald-700 text-sm leading-relaxed">
                  Peta menunjukkan sebaran {data.length} titik pemetaan sampah dengan koordinat UTM yang akurat untuk memudahkan navigasi dan pengelolaan persampahan.
                </p>
              </div>
              
              <div className="bg-blue-50 rounded-xl p-6 border-l-4 border-blue-500">
                <h3 className="font-semibold text-blue-800 mb-2 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  Cara Penggunaan
                </h3>
                <p className="text-blue-700 text-sm leading-relaxed">
                  Klik tombol "Lihat Maps" pada tabel di bawah untuk membuka lokasi spesifik di Google Maps dan mendapatkan navigasi langsung ke titik yang dimaksud.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Data Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-emerald-500">
            <div className="flex items-center">
              <div className="p-3 bg-emerald-100 rounded-full mr-4">
                <svg className="w-6 h-6 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{data.length}</p>
                <p className="text-sm text-gray-600">Total Titik</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-full mr-4">
                <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 6a2 2 0 104 0 2 2 0 00-4 0zm6 0a2 2 0 104 0 2 2 0 00-4 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{filteredData.length}</p>
                <p className="text-sm text-gray-600">Hasil Filter</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-purple-500">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-full mr-4">
                <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">100%</p>
                <p className="text-sm text-gray-600">Akurasi Data</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search dan Filter */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                Cari Titik Pemetaan
              </label>
              <div className="relative">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
                <input
                  type="text"
                  id="search"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="Cari berdasarkan alamat, titik, atau deskripsi..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                />
              </div>
            </div>
            <div className="text-sm text-gray-600 bg-gray-50 px-4 py-3 rounded-lg">
              Menampilkan <span className="font-semibold">{currentData.length}</span> dari <span className="font-semibold">{filteredData.length}</span> hasil
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white shadow-2xl rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-emerald-700 to-emerald-800">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">No</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Koordinat UTM</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Titik</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Alamat</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentData.map((item, index) => (
                  <tr key={item.no} className="hover:bg-emerald-50 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="inline-flex items-center justify-center w-8 h-8 bg-emerald-100 text-emerald-800 rounded-full text-sm font-semibold">
                          {item.no}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <div className="font-medium text-gray-900">X: {item.utmx.toLocaleString()}</div>
                        <div className="text-gray-500">Y: {item.utmy.toLocaleString()}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {item.titik}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs">
                        <p className="truncate" title={item.alamat}>
                          {item.alamat}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white text-sm font-medium rounded-lg hover:from-emerald-700 hover:to-emerald-800 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all duration-200 shadow-md hover:shadow-lg"
                      >
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        Lihat Maps
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  Halaman <span className="font-medium">{currentPage}</span> dari{' '}
                  <span className="font-medium">{totalPages}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Sebelumnya
                  </button>
                  
                  {[...Array(totalPages)].map((_, index) => {
                    const page = index + 1;
                    if (
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                            currentPage === page
                              ? 'bg-emerald-600 text-white'
                              : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {page}
                        </button>
                      );
                    } else if (
                      page === currentPage - 2 ||
                      page === currentPage + 2
                    ) {
                      return (
                        <span key={page} className="px-2 py-2 text-sm text-gray-500">
                          ...
                        </span>
                      );
                    }
                    return null;
                  })}
                  
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Selanjutnya
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* No Results */}
        {filteredData.length === 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.239 0-4.236-.906-5.672-2.374M6.343 6.343A8.014 8.014 0 003.344 9.5c-.41.738-.41 1.746 0 2.484.906 1.636 2.825 3.016 5.656 3.016" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak Ada Hasil</h3>
            <p className="text-gray-600">Tidak ditemukan titik pemetaan yang sesuai dengan pencarian Anda.</p>
            <button
              onClick={() => setSearchTerm('')}
              className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Reset Pencarian
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default PemetaanSampah;