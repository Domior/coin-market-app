const JWTService = require('./services/JWTService');
const handleError = require('./helpers/handleError');
const STATUSES = require('./constants/statuses');
const { ERRORS } = require('./constants/text');

const authorizationHeaderMask = 'Bearer ';

module.exports = async (request, response, next) => {
  try {
    if (!request.headers.authorization || !request.headers.authorization.startsWith(authorizationHeaderMask)) {
      throw new Error(ERRORS.INVALID_AUTHORIZATION_HEADER);
    }

    const token = await request.headers.authorization.split(' ')[1];

    const verificationResult = JWTService.verifyToken(token);

    if (verificationResult.valid) {
      request.user = verificationResult.decoded;
      next();
    } else {
      throw new Error(ERRORS.TOKEN_INVALID);
    }
  } catch (error) {
    console.error('Authentication Error:', error);
    handleError(response, STATUSES.UNAUTHORIZED, ERRORS.INVALID_REQUEST);
  }
};
