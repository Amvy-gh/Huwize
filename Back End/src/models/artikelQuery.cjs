const dbPool = require("../config/database.cjs");

const getArtikel = () => {
  const query = "SELECT * FROM artikel_lingkungan";

  try {
    return dbPool.query(query);
  } catch (error) {
    throw error;
  }
};

const getArtikelById = (id) => {
  const query = "SELECT * FROM artikel_lingkungan WHERE id_artikel = ?";
  const values = [id];

  try {
    return dbPool.query(query, values);
  } catch (error) {
    throw error;
  }
};

const addArtikel = (body, gambar_artikel) => {
  const sumber_artikel = body.sumber_artikel || "Unknown";
  const query = `INSERT INTO artikel_lingkungan (tanggal_artikel, judul_artikel, author, gambar_artikel, isi_artikel, sumber_artikel) VALUES (?, ?, ?, ?, ?, ?)`;
  const values = [
    body.tanggal_artikel,
    body.judul_artikel,
    body.author,
    gambar_artikel,
    body.isi_artikel,
    sumber_artikel,
  ];

  try {
    return dbPool.execute(query, values);
  } catch (error) {
    throw error;
  }
};

const updateArtikel = (body, id, gambar_artikel) => {
  let query = `UPDATE artikel_lingkungan SET 
    judul_artikel = ?,
    author = ?,
    isi_artikel = ?,
    sumber_artikel = ?`;

  const values = [
    body.judul_artikel,
    body.author,
    body.isi_artikel,
    body.sumber_artikel
  ];

  // Hanya tambahkan update gambar jika ada gambar baru
  if (gambar_artikel) {
    query += `, gambar_artikel = ?`;
    values.push(gambar_artikel);
  }

  query += ` WHERE id_artikel = ?`;
  values.push(id);

  try {
    return dbPool.execute(query, values);
  } catch (error) {
    throw error;
  }
};

const deleteArtikel = (id) => {
  const query = "DELETE FROM artikel_lingkungan WHERE id_artikel = ?";
  const values = [id];

  try {
    return dbPool.execute(query, values);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getArtikel,
  getArtikelById,
  addArtikel,
  updateArtikel,
  deleteArtikel,
};
