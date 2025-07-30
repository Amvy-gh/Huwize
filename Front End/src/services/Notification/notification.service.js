import axios from "axios";

const serverUrl = import.meta.env.VITE_SERVER_URL;

export const getActiveReports = async (callback) => {
  try {
    const res = await axios.get(`${serverUrl}laporan-lingkungan/active`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    callback(res.data);
  } catch (error) {
    console.log(`${error.response?.data.message}`);
  }
};

// Tambahkan fungsi ini jika route `/laporan-lingkungan/new` tersedia
export const getNewReports = async (callback) => {
  try {
    const res = await axios.get(`${serverUrl}laporan-lingkungan/new`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    callback(res.data);
  } catch (error) {
    console.log(`${error.response?.data.message}`);
  }
};
