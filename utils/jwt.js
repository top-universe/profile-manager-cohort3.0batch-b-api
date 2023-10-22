const jwt = require('jsonwebtoken');

// Secret key for signing and verifying tokens
const secretKey = 'your-secret-key';

const generateJwt = (id) => {
  try {
    return jwt.sign({ userId: id }, process.env.SECRET, { expiresIn: '7d' })
  } catch (error) {
    throw "Could not generate jwt"
  }
}


const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    return null; // Token is invalid
  }
}

module.exports = {
  verifyToken, generateJwt
};
