const MONGODB = {
  CONNECTED: 'Successfully connected to MongoDB!',
  UNABLE_CONNECT: 'Unable to connect to MongoDB!',
};

const ERRORS = {
  ALREADY_HAVE_ACCOUNT: 'Already have an account',
  NO_SUCH_USER: 'No such user. Please register',
  INCORRECT_EMAIL_OR_PASSWORD: 'Incorrect email or password',
  SOMETHING_IS_WRONG_WITH_EMAIL_SERVICE: 'Something wrong with email service',
  TOKEN_INVALID: 'Token is invalid',
  INVALID_AUTHORIZATION_HEADER: 'Invalid Authorization header',
  INVALID_REQUEST: 'Invalid request',
  SOMETHING_WENT_WRONG: 'Something went wrong. Try again later',
  TOO_MANY_REQUESTS: 'Too many requests. Please try again later',
  INTERNAL_SERVER_ERROR: 'Internal server error',
  INVALID_EMAIL_TYPE: 'Invalid email type',
  INVALID_PASSWORD_TYPE: 'Invalid password type',
};

const SUCCESS = {
  REGISTER_SUCCESSFUL: 'You successfully registered! Please log in',
  PASSWORD_WAS_RESET: 'Your password was successfully reset. Please log in',
  RESET_PASSWORD_LINK_SENT: 'Reset password link was successfully sent to your email',
  LOGIN_SUCCESSFUL: 'Login Successful',
  LOGOUT_SUCCESSFUL: 'Logout Successful',
};

module.exports = { MONGODB, ERRORS, SUCCESS };
