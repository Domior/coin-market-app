const jwt = require('jsonwebtoken');

const handleError = require('./helpers/handleError');
const STATUSES = require('./constants/statuses');

module.exports = async (request, response, next) => {
  try {
    const token = await request.headers.authorization.split(' ')[1];

    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await decodedToken;

    request.user = user;

    next();
  } catch (error) {
    handleError(response, STATUSES.UNAUTHORIZED, 'Invalid request');
  }
};
