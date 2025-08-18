import axios from "axios";

const serverUrl = import.meta.env.VITE_SERVER_URL;

export const newVisitor = async () => {
  try {
    const response = await axios.post(`${serverUrl}visitor`);
    return response.data;
  } catch (error) {
    console.error("Error adding visitor:", error);
    return { total: 0 };
  }
};

export const totalWebVisitor = async (callback) => {
  try {
    const response = await axios.get(`${serverUrl}visitor/total`);
    callback(response.data);
  } catch (error) {
    console.error("Error getting total visitors:", error);
    callback({ total: 0 });
  }
};
