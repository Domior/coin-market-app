const validateEmail = require('./validateEmail');
const validatePassword = require('./validatePassword');

const validateUserLoginData = async (res, email, password) => {
  const emailResult = await validateEmail(res, email);

  const passResult = await validatePassword(res, password);

  return emailResult && passResult;
};

module.exports = validateUserLoginData;
