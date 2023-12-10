const { PASSWORD_PATTERN } = require('../constants/patterns');
const handleError = require('../helpers/handleError');
const { ERRORS } = require('../constants/text');
const STATUSES = require('../constants/statuses');

const validatePassword = async (res, password) => {
  if (!password) return;

  const result = PASSWORD_PATTERN.test(password);

  if (!result) return handleError(res, STATUSES.BAD_REQUEST, ERRORS.INVALID_PASSWORD_TYPE);

  return result;
};

module.exports = validatePassword;
