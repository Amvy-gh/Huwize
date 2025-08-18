const dbPool = require("../config/database.cjs");

const setVisitor = (count) => {
  const query = "INSERT INTO web_visitor(visitor) VALUES (?)";
  const values = [count];

  try {
    return dbPool.execute(query, values);
  } catch (error) {
    throw error;
  }
};

const getTotalVisitor = () => {
  const query = "SELECT SUM(visitor) as total_visitor FROM web_visitor";

  try {
    return dbPool.query(query);
  } catch (error) {
    throw error;
  }
};

const getLaporanTotal = () => {
  const query = "SELECT COUNT(*) as total FROM laporan_lingkungan";
  return dbPool.query(query);
};

const getLaporanSelesaiTotal = () => {
  const query = "SELECT COUNT(*) as total FROM laporan_lingkungan WHERE status = 'Selesai'";
  return dbPool.query(query);
};

module.exports = {
  setVisitor,
  getTotalVisitor,
  getLaporanTotal,
  getLaporanSelesaiTotal,
};