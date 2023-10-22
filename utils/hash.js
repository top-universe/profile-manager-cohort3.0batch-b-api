const bcrypt = require('bcrypt');

const saltRounds = 10;

const hashFunction = async (plainText) => {
  try {
    const hash = await bcrypt.hash(plainText, saltRounds);
    return hash;
  } catch (error) {
    console.error(error);
    throw "Error hashing password";
  }
};

const comparePassword = async (plainText, hashedPassword) => {
  try {
    const match = await bcrypt.compare(plainText, hashedPassword);
    return match;
  } catch (error) {
    console.error(error);
    throw "Error comparing passwords";
  }
};

module.exports = {
  hashFunction,
  comparePassword
};
