const dbPool = require("../config/database.cjs");

// Membuat admin baru
const createAdmin = async (username, password) => {
  const query = `INSERT INTO user_admin (username, password, refresh_token) VALUES (?, ?, ?)`;
  const values = [username, password, null];
  const [result] = await dbPool.execute(query, values);
  return result;
};

// Mengambil seluruh data admin
const getAdmin = async () => {
  const query = "SELECT * FROM user_admin";
  const [rows] = await dbPool.execute(query);
  return rows;
};

module.exports = {
  createAdmin,
  getAdmin,
};