const STATUSES = require('../constants/statuses');
const { ERRORS } = require('../constants/text');
const handleError = require('../helpers/handleError');

module.exports = callback => {
  return async (req, res, next) => {
    try {
      await callback(req, res, next);
    } catch (error) {
      if (error.response && error.response.status === STATUSES.TOO_MANY_REQUESTS)
        return handleError(res, STATUSES.TOO_MANY_REQUESTS, ERRORS.TOO_MANY_REQUESTS);

      if (error.code && error.message) return handleError(res, error.code, error.message);

      return handleError(res, STATUSES.INTERNAL_SERVER_ERROR, ERRORS.INTERNAL_SERVER_ERROR);
    }
  };
};
