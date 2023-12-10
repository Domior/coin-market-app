const { EMAIL_PATTERN } = require('../constants/patterns');
const handleError = require('../helpers/handleError');
const { ERRORS } = require('../constants/text');
const STATUSES = require('../constants/statuses');

const validateEmail = async (res, email) => {
  if (!email) return;

  const result = EMAIL_PATTERN.test(email);

  if (!result) return handleError(res, STATUSES.BAD_REQUEST, ERRORS.INVALID_EMAIL_TYPE);

  return result;
};

module.exports = validateEmail;
