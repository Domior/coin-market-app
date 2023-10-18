const jwt = require('jsonwebtoken');

const handleError = require('./helpers/handleError');

module.exports = async (request, response, next) => {
  try {
    const token = await request.headers.authorization.split(' ')[1];

    console.log(token);

    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await decodedToken;

    request.user = user;

    next();
  } catch (error) {
    handleError(response, 401, 'Invalid request');
  }
};
