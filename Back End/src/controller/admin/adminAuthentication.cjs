const bcrypt = require("bcrypt");
const { getAdminAccount } = require("./adminAccount.cjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const adminAuth = async (req, res) => {
  const { body } = req;

  if (!body.username || !body.password) {
    return res.status(403).json({
      message: "Username atau password tidak boleh kosong",
    });
  }

  try {
    const data = await getAdminAccount();
    if (!data) {
      return res.status(500).json({
        message: "Gagal mengambil data admin",
      });
    }

    const admin = JSON.parse(data);

    if (body.username !== admin.username) {
      return res.status(401).json({
        message: "Username salah",
      });
    }

    const isPasswordValid = await bcrypt.compare(body.password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Password salah",
      });
    }

    const payload = {
      id: admin.id_user,
      username: admin.username,
    };

    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) {
      return res.status(500).json({
        message: "Konfigurasi server tidak lengkap",
      });
    }

    const expiresIn = 60 * 60 * 48;
    const token = jwt.sign(payload, secretKey, { expiresIn: expiresIn });

    return res.status(200).json({
      message: "Login Berhasil",
      data: {
        username: admin.username,
      },
      token: token,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Kegagalan dari server saat proses login",
    });
  }
};

module.exports = adminAuth;