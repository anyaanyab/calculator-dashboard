// Middleware function for authentication 
// Checks for JWT in request headers to authenticate

// Necessary library imported for verification and decoding of JWTs
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  // Attempt to retrieve JWT from request headers
  const token = req.header('x-auth-token');

  // No token found -> 401 status code and JSON message
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  // Attempt to verify the token
  try {
    // Token and secrey key passed
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Token valid -> token decoded and assigned 
    req.user = decoded;
    next();
    // Error caught if token verification fails
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// auth function exported for usage in other files
module.exports = auth;