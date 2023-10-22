const crypto = require('crypto');
require('dotenv').config();

// Get the secret key from your environment variables
const secretKey = process.env.SECRET;

// Encrypt function
exports.encrypt = (data) => {
  const cipher = crypto.createCipher('aes-256-cbc', secretKey);
  let encryptedData = cipher.update(data.id, 'utf8', 'hex');
  encryptedData += cipher.final('hex');
  return encryptedData;
}

// Decrypt function
exports.decrypt = (encryptedData) => {
  const decipher = crypto.createDecipher('aes-256-cbc', secretKey);
  let decryptedData = decipher.update(encryptedData, 'hex', 'utf8');
  decryptedData += decipher.final('utf8');
  return decryptedData;
}
