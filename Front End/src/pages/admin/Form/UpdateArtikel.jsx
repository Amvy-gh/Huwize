import { useEffect, useState } from "react";
import InputLabel from "./InputLabel";
import TextAreaLabel from "./TextAreaLabel";
import {
  getArtikelById,
  showGambar,
  updateArtikel,
} from "../../../services/Artikel/artikel.service";

import { useParams } from "react-router-dom";

const UpdateArtikel = () => {
  const { id } = useParams();
  const [file, setFile] = useState();
  const [judulArtikel, setJudulArtikel] = useState("");
  const [author, setAuthor] = useState("");
  const [isiArtikel, setIsiArtikel] = useState("");
  const [sumberArtikel, setSumberArtikel] = useState("");
  const [currentImage, setCurrentImage] = useState("");
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    getArtikelById(id, (data) => {
      const artikel = data.data[0];
      if (artikel) {
        setJudulArtikel(artikel.judul_artikel);
        setAuthor(artikel.author);
        setIsiArtikel(artikel.isi_artikel);
        setSumberArtikel(artikel.sumber_artikel);
        setCurrentImage(showGambar(artikel.gambar_artikel));
      }
    });
  }, [id]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="bg-light min-h-screen flex flex-col items-center py-10">
      <div className="w-10/12 max-w-3xl p-7 bg-white border rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6">
          Perbarui Artikel
        </h2>
        <form onSubmit={(e) => updateArtikel(e, id)} className="space-y-6">
          <InputLabel
            label="Judul Artikel :"
            name="judul_artikel"
            type="text"
            placeholder="Masukkan judul artikel"
            variant="py-2 px-4"
            value={judulArtikel}
            onChange={(e) => setJudulArtikel(e.target.value)}
          />

          <InputLabel
            label="Author :"
            name="author"
            type="text"
            placeholder="Masukkan nama author"
            variant="py-2 px-4"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />

          <InputLabel
            label="Sumber Artikel : "
            name="sumber_artikel"
            type="text"
            placeholder="Masukkan Sumber Artikel Berupa URL"
            variant="py-2 px-4"
            value={sumberArtikel}
            onChange={(e) => setSumberArtikel(e.target.value)}
          />
          <TextAreaLabel
            label="Isi Artikel :"
            name="isi_artikel"
            placeholder="Masukkan deskripsi artikel"
            variant="py-2 px-4 h-[500px]"
            value={isiArtikel}
            onChange={(e) => setIsiArtikel(e.target.value)}
          />

          {/* Gambar Section */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Gambar Artikel Saat Ini:
              </label>
              {currentImage && (
                <img
                  src={currentImage}
                  alt="Gambar Saat Ini"
                  className="mt-2 w-48 h-48 object-cover rounded-lg border border-gray-200"
                />
              )}
            </div>

            <div>
              <div className="flex flex-col space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Upload Gambar Baru:
                </label>
                <p className="text-xs text-gray-500 italic">
                  *Jika tidak ingin mengubah gambar, biarkan bagian ini kosong
                </p>
              </div>
              <InputLabel
                label=""
                name="gambar_artikel"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                variant="py-2 px-4"
                className="file:bg-green-100 file:text-green-700"
                required={false}
              />
              {previewImage && (
                <div className="mt-2 space-y-2">
                  <div className="flex items-center space-x-2">
                    <p className="text-sm text-green-600 font-medium">
                      Preview Gambar Baru:
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setPreviewImage(null);
                        document.querySelector('input[name="gambar_artikel"]').value =
                          "";
                      }}
                      className="text-xs text-red-500 hover:text-red-700"
                    >
                      Batalkan perubahan gambar
                    </button>
                  </div>
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="w-48 h-48 object-cover rounded-lg border border-gray-200"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="bg-green-800 hover:bg-green-900 text-white font-semibold py-2 w-full sm:w-2/5 rounded-lg shadow-lg"
            >
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateArtikel;
