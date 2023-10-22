const { verifyToken } = require('../utils/jwt'); // Import your verification function

function authenticateToken(req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
    return Response.error(res, 401, 'Unauthorized')
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    return Response.error(res, 403, 'Token is invalid');
  }

  // Attach the decoded token to the request for use in your route handlers
  req.user = decoded;

  next();
}

module.exports = {
  authenticateToken,
};
