const dbPool = require("../config/database.cjs");

// Membuat admin baru
const createAdmin = async (username, password) => {
  const query = `INSERT INTO user_admin (username, password, refresh_token) VALUES (?, ?, ?)`;
  const values = [username, password, null];

  try {
    const [result] = await dbPool.execute(query, values);
    return result;
  } catch (error) {
    console.error("Gagal membuat admin:", error);
    throw error;
  }
};

// Mengambil seluruh data admin
const getAdmin = async () => {
  const query = "SELECT * FROM user_admin";

  try {
    const [rows] = await dbPool.execute(query);
    return rows;
  } catch (error) {
    console.error("Gagal mengambil data admin:", error);
    throw error;
  }
};

module.exports = {
  createAdmin,
  getAdmin,
};
