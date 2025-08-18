import { InputLabel, TextAreaLabel } from "./InputLabel";
import { useState } from "react";
import { submitLaporan } from "../../services/Laporan/laporan.service";

const FormLaporan = () => {
  const [formData, setFormData] = useState({
    nama_pelapor: "",
    nomor_telepon: "",
    lokasi: "",
    deskripsi: "",  
    gambar_laporan: null
  });
  
  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          gambar_laporan: "Ukuran file maksimal 5MB"
        }));
        return;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({
          ...prev,
          gambar_laporan: "File harus berupa gambar"
        }));
        return;
      }

      setFormData(prev => ({
        ...prev,
        gambar_laporan: file
      }));
      
      setPreview(URL.createObjectURL(file));
      
      // Clear error if exists
      if (errors.gambar_laporan) {
        setErrors(prev => ({
          ...prev,
          gambar_laporan: ""
        }));
      }
    }
  };

  const validateForm = () => {
    const newErrors = {}; 
    let isValid = true;
    
    // Trim all string values before validation
    const trimmedFormData = {
      nama_pelapor: formData.nama_pelapor?.trim() || '',
      nomor_telepon: formData.nomor_telepon?.trim() || '',
      lokasi: formData.lokasi?.trim() || '',
      deskripsi: formData.deskripsi?.trim() || ''
    };
    
    if (!trimmedFormData.nama_pelapor) {
      newErrors.nama_pelapor = "Nama pelapor wajib diisi";
      isValid = false;
    }
    
    if (!trimmedFormData.nomor_telepon) {
      newErrors.nomor_telepon = "Nomor telepon wajib diisi";
      isValid = false;
    } else if (!/^(\+62|62|0)[0-9]{9,13}$/.test(trimmedFormData.nomor_telepon.replace(/\s/g, ''))) {
      newErrors.nomor_telepon = "Nomor telepon tidak valid";
      isValid = false;
    }
    
    if (!trimmedFormData.lokasi) {
      newErrors.lokasi = "Lokasi laporan wajib diisi";
      isValid = false;
    }
    
    if (!trimmedFormData.deskripsi) {
      newErrors.deskripsi = "Deskripsi laporan wajib diisi";
      isValid = false;
    } else if (trimmedFormData.deskripsi.length < 10) {
      newErrors.deskripsi = "Deskripsi minimal 10 karakter";
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      const formDataToSubmit = new FormData();
      const date = new Date();
      const currentDate = date.toLocaleDateString("id-ID");
      
      // Append all required fields
      formDataToSubmit.append("tanggal_laporan", currentDate);
      formDataToSubmit.append("nama", formData.nama_pelapor.trim());
      formDataToSubmit.append("no_telepon", formData.nomor_telepon.trim());
      formDataToSubmit.append("lokasi_laporan", formData.lokasi.trim());
      formDataToSubmit.append("deskripsi_laporan", formData.deskripsi.trim());
      formDataToSubmit.append("status", "Aktif");
      
      if (formData.gambar_laporan) {
        formDataToSubmit.append("gambar_laporan", formData.gambar_laporan);
      }

      const response = await submitLaporan(formDataToSubmit);
      
      // Reset form only after successful submission
      if (response) {
        // Reset form state
        setFormData({
          nama_pelapor: "",
          nomor_telepon: "",
          lokasi: "",
          deskripsi: "",
          gambar_laporan: null
        });
        
        // Reset file input and preview
        setPreview(null);
        const fileInput = document.querySelector('input[name="gambar_laporan"]');
        if (fileInput) {
          fileInput.value = '';
        }
        
        // Clear any errors
        setErrors({});
        
        // Show success message
        alert("Laporan berhasil dikirim!");

        // Optional: Redirect or refresh after short delay
        setTimeout(() => {
          window.location.href = "/laporan";
        }, 1000);
      }
      
    } catch (error) {
      console.error("Error submitting form:", error);
      const errorMessage = error.response?.data?.message || "Terjadi kesalahan saat mengirim laporan. Silakan coba lagi.";
      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const removeImage = () => {
    setFormData(prev => ({
      ...prev,
      gambar_laporan: null
    }));
    setPreview(null);
    
    // Reset file input
    const fileInput = document.querySelector('input[name="gambar_laporan"]');
    if (fileInput) {
      fileInput.value = '';
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <InputLabel
            label="Nama Pelapor"
            name="nama_pelapor"
            type="text"
            value={formData.nama_pelapor}
            onChange={handleInputChange}
            variant="py-3 px-4"
            className={`w-full border rounded-xl transition-all duration-200 focus:ring-2 focus:ring-green-500 focus:border-transparent focus:outline-none ${
              errors.nama_pelapor 
                ? 'border-red-300 bg-red-50' 
                : 'border-gray-300 hover:border-gray-400'
            }`}
            placeholder="Masukkan nama lengkap Anda"
            required
          />
          {errors.nama_pelapor && (
            <p className="mt-1 text-sm text-red-600">{errors.nama_pelapor}</p>
          )}
        </div>

        <div>
          <InputLabel
            label="Nomor Telepon"
            name="nomor_telepon"
            type="tel"
            value={formData.nomor_telepon}
            onChange={handleInputChange}
            variant="py-3 px-4"
            className={`w-full border rounded-xl transition-all duration-200 focus:ring-2 focus:ring-green-500 focus:border-transparent focus:outline-none ${
              errors.nomor_telepon 
                ? 'border-red-300 bg-red-50' 
                : 'border-gray-300 hover:border-gray-400'
            }`}
            placeholder="Contoh: 08123456789"
            required
          />
          {errors.nomor_telepon && (
            <p className="mt-1 text-sm text-red-600">{errors.nomor_telepon}</p>
          )}
        </div>

        <div>
          <InputLabel
            label="Lokasi Laporan"
            name="lokasi"
            type="text"
            value={formData.lokasi}
            onChange={handleInputChange}
            variant="py-3 px-4"
            className={`w-full border rounded-xl transition-all duration-200 focus:ring-2 focus:ring-green-500 focus:border-transparent focus:outline-none ${
              errors.lokasi 
                ? 'border-red-300 bg-red-50' 
                : 'border-gray-300 hover:border-gray-400'
            }`}
            placeholder="Contoh: Jl. Sudirman No. 123, Jakarta"
            required
          />
          {errors.lokasi && (
            <p className="mt-1 text-sm text-red-600">{errors.lokasi}</p>
          )}
        </div>

        <div>
          <TextAreaLabel
            label="Deskripsi Laporan"
            name="deskripsi"
            value={formData.deskripsi}
            onChange={handleInputChange}
            placeholder="Jelaskan secara detail masalah yang ingin Anda laporkan..."
            className={`w-full border rounded-xl py-3 px-4 transition-all duration-200 focus:ring-2 focus:ring-green-500 focus:border-transparent focus:outline-none resize-none h-32 ${
              errors.deskripsi 
                ? 'border-red-300 bg-red-50' 
                : 'border-gray-300 hover:border-gray-400'
            }`}
            required
          />
          <div className="flex justify-between mt-1">
            {errors.deskripsi ? (
              <p className="text-sm text-red-600">{errors.deskripsi}</p>
            ) : (
              <span></span>
            )}
            <p className="text-sm text-gray-500">
              {formData.deskripsi.length}/500 karakter
            </p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gambar Laporan (Opsional)
          </label>
          
          {!preview ? (
            <div className="relative">
              <input
                type="file"
                name="gambar_laporan"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors duration-200 ${
                errors.gambar_laporan 
                  ? 'border-red-300 bg-red-50' 
                  : 'border-gray-300 hover:border-green-400 hover:bg-green-50'
              }`}>
                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p className="mt-2 text-sm text-gray-600">
                  <span className="font-medium text-green-600">Klik untuk upload</span> atau drag & drop
                </p>
                <p className="text-xs text-gray-500">PNG, JPG, JPEG hingga 5MB</p>
              </div>
            </div>
          ) : (
            <div className="relative inline-block">
              <div className="w-48 h-48 mx-auto overflow-hidden rounded-xl border border-gray-300 shadow-sm">
                <img 
                  src={preview} 
                  alt="Preview" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                />
              </div>
              <button
                type="button"
                onClick={removeImage}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-110"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}
          
          {errors.gambar_laporan && (
            <p className="mt-1 text-sm text-red-600">{errors.gambar_laporan}</p>
          )}
        </div>

        <div className="pt-6">
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-lg hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Mengirim Laporan...
              </div>
            ) : (
              'Kirim Laporan'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormLaporan;