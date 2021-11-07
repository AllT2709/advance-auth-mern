const bcrypt = require("bcryptjs");

const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const passwordHashed = await bcrypt.hash(password, salt);
  return passwordHashed;
};

const comparePassword = async (password, passwordToCompare) => {
  return await bcrypt.compare(password, passwordToCompare);
};
module.exports = {
  encryptPassword,
  comparePassword,
};
