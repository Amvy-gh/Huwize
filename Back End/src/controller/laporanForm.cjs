const {
  getLaporan,
  addLaporan,
  deleteLaporan,
  updateStatusLaporan,
  getNewLaporan,
  getLaporanActive,
} = require("../models/laporanQuery.cjs");

const getLaporanForm = async (req, res) => {
  try {
    const [data] = await getLaporan();

    if (data.length === 0) {
      res.status(404).json({
        message: "Data laporan tidak ditemukan ",
      });
    } else {
      res.status(200).json({
        message: "Data laporan berhasil didapatkan",
        data: data,
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Data laporan gagal didapatkan",
    });
  }
};

const createLaporanForm = async (req, res, next) => {
  const { body } = req;
  if (
    !body.tanggal_laporan ||
    !body.nama ||
    !body.no_telepon ||
    !body.lokasi_laporan ||
    !body.deskripsi_laporan ||
    !body.status
  ) {
    return res.status(422).json({
      message: "Semua field harus diisi",
    });
  }
  if (!req.files.gambar_laporan || !req.files) {
    return res.status(422).json({
      message: "Gambar harus diupload",
    });
  }

  const gambar_laporan = req.files.gambar_laporan[0].path;

  try {
    await addLaporan(body, gambar_laporan);
    res.status(201).json({
      message: "Laporan berhasil ditambahkan",
      data: body,
    });
  } catch (error) {
    res.status(500).json({
      message: "Laporan gagal ditambahkan",
    });
    console.log(error);
  }
};

const updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  if (!id) {
    return res.status(422).json({
      message: "ID harus diisi",
    });
  }

  try {
    await updateStatusLaporan(id, status);
    res.status(200).json({
      message: "Status laporan berhasil diupdate",
    });
  } catch (error) {
    res.status(500).json({
      message: "Status laporan gagal diupdate",
    });
  }
};

const deleteLaporanForm = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(422).json({
      message: "ID harus diisi",
    });
  }

  try {
    const idLaporan = parseInt(id);
    deleteLaporan(idLaporan);
    res.status(200).json({
      message: "Laporan berhasil dihapus",
      id: id,
    });
  } catch (err) {
    res.status(500).json({
      message: "Laporan gagal dihapus",
      error: err,
    });
  }
};

const getNewLaporanCount = async (req, res) => {
  try {
    const [data] = await getNewLaporan();
    res.status(200).json({
      message: "Jumlah laporan baru berhasil didapatkan",
      count: data[0].count,
    });
  } catch (err) {
    res.status(500).json({
      message: "Gagal mendapatkan jumlah laporan baru",
    });
  }
};

const getActiveLaporan = async (req, res) => {
  try {
    const [rows] = await getLaporanActive();
    
    res.status(200).json({
      message: "Data laporan aktif berhasil didapatkan",
      data: rows
    });
  } catch (err) {
    console.error('Controller Error:', err);
    res.status(500).json({
      message: "Gagal mendapatkan data laporan aktif",
      error: err.message
    });
  }
};

module.exports = {
  getLaporanForm,
  createLaporanForm,
  deleteLaporanForm,
  updateStatus,
  getNewLaporanCount,
  getActiveLaporan,
};
