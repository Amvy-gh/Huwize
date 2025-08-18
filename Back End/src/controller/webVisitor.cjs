const { setVisitor, getTotalVisitor } = require("../models/visitor.cjs");

const setNewVisitor = async (req, res) => {
  try {
    await setVisitor(1); // Ubah "visited" menjadi 1
    res.status(200).json({ message: "Visitor updated successfully" });
  } catch (error) {
    console.error("Error in setNewVisitor:", error);
    res.status(500).json({ message: "Failed to update visitor" });
  }
};

const totalVisitor = async (req, res) => {
  try {
    const [total] = await getTotalVisitor();
    const count = total.reduce((acc, curr) => acc + curr.total_visitor, 0);
    res.status(200).json({ 
      message: "Total visitor retrieved successfully",
      total: count 
    });
  } catch (error) {
    console.error("Error in totalVisitor:", error);
    res.status(500).json({ message: "Failed to get total visitor" });
  }
};

module.exports = {
  setNewVisitor,
  totalVisitor,
};
