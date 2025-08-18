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
  const query = "SELECT visitor as total_visitor FROM web_visitor";

  try {
    return dbPool.query(query);
  } catch (error) {
    throw error;
  }
};

const getTotalLaporan = async (req, res) => {
  try {
    const [result] = await getLaporanTotal();
    res.status(200).json({
      message: "Total laporan retrieved successfully",
      total: result[0].total || 0,
    });
  } catch (error) {
    console.error("Error getting total laporan:", error);
    res.status(500).json({ message: "Failed to get total laporan", total: 0 });
  }
};

const getTotalLaporanSelesai = async (req, res) => {
  try {
    const [result] = await getLaporanSelesaiTotal();
    res.status(200).json({
      message: "Total laporan selesai retrieved successfully",
      total: result[0].total || 0,
    });
  } catch (error) {
    console.error("Error getting total laporan selesai:", error);
    res.status(500).json({
      message: "Failed to get total laporan selesai",
      total: 0,
    });
  }
};

module.exports = {
  setVisitor,
  getTotalVisitor,
  getTotalLaporan,
  getTotalLaporanSelesai,
};