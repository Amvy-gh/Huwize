import axios from "axios";

const serverUrl = import.meta.env.VITE_SERVER_URL;

// Get semua laporan
export const getLaporan = async (callback) => {
  try {
    const response = await axios.get(`${serverUrl}laporan-lingkungan`);
    if (response.data && Array.isArray(response.data.data)) {
      callback(response.data);
    } else {
      console.error("Invalid data format:", response.data);
      callback({ data: [] });
    }
  } catch (error) {
    console.error("Error fetching laporan:", error);
    callback({ data: [] });
  }
};

// Submit laporan baru
export const submitLaporan = async (formData) => {
  try {
    const res = await axios.post(`${serverUrl}laporan-lingkungan`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (res.status === 201 || res.status === 200) {
      return res.data;
    }
    throw new Error("Failed to submit laporan");
  } catch (error) {
    console.error("Submit error:", error.response?.data);
    throw error;
  }
};

// Update status laporan
export const updateStatus = async (id, status) => {
  const statusLaporan = status === "Aktif" ? "Selesai" : "Aktif";

  const res = await axios.put(
    `${serverUrl}laporan-lingkungan/${id}`,
    { status: statusLaporan },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    }
  );

  return res;
};

// Dapetin URL gambar laporan dari path
export const showGambarLaporan = (path) => {
  if (!path) return "";

  const standardizedPath = path.replace(/\\/g, "/");
  const pathGambar = standardizedPath.split("/");

  return `${serverUrl}laporan-lingkungan/gambar/laporan/${
    pathGambar[pathGambar.length - 1]
  }`;
};

// Get total laporan
export const getTotalLaporan = async () => {
  const res = await axios.get(`${serverUrl}laporan-lingkungan/laporan/total`);
  return res.data;
};

// Get laporan selesai
export const getLaporanSelesai = async () => {
  const res = await axios.get(
    `${serverUrl}laporan-lingkungan/laporan/total/selesai`
  );
  return res.data;
};

// Tambah visitor baru
export const setNewVisitor = async () => {
  await axios.post(`${serverUrl}visitor`);
};

// Get total visitor
export const getTotalVisitor = async () => {
  const res = await axios.get(`${serverUrl}visitor/total`);
  return res.data;
};
