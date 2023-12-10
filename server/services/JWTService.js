const jwt = require('jsonwebtoken');

class JWTService {
  static generateToken(payload, expiresIn = '1h') {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn });
  }

  static verifyToken(token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      return { valid: true, decoded };
    } catch (error) {
      return { valid: false, error: error.message };
    }
  }
}

module.exports = JWTService;
