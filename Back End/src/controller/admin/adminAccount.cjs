const bcrypt = require("bcrypt");
const { getAdmin, createAdmin } = require("../../models/userAdminQuery.cjs");
require("dotenv").config();

const saltRounds = 10; 

const hashPassword = async (password, username) => {
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);
  await createAdmin(username, hashedPassword);
};

const getAdminAccount = async () => {
  const data = await getAdmin();
  if (!data || data.length === 0) {
    throw new Error('No admin account found');
  }
  return JSON.stringify(data[0]);
};

module.exports = {
  hashPassword,
  getAdminAccount,
};