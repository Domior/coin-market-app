const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

const UserModel = require('../models/Users');
const handleError = require('../helpers/handleError');
const sendResponse = require('../helpers/sendResponse');
const auth = require('../auth');
const STATUSES = require('../constants/statuses');
const { ERRORS, SUCCESS } = require('../constants/text');
const JWTService = require('../services/JWTService');
const NodemailerService = require('../services/NodemailerService');
const DBService = require('../services/DBService');
const validateUserLoginData = require('../helpers/validateUserLoginData');
const validateEmail = require('../helpers/validateEmail');
const validatePassword = require('../helpers/validatePassword');
const handleCallback = require('../helpers/handleCallback');

const saltRounds = 10;

const userModelService = new DBService(UserModel);

router.post(
  '/signup',
  handleCallback(async (req, res) => {
    const { email, password } = req.body;

    const validationResult = await validateUserLoginData(res, email, password);

    if (!validationResult) return;

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await userModelService.findUser(email);

    if (user) return handleError(res, STATUSES.UNPROCESSABLE_CONTENT, ERRORS.ALREADY_HAVE_ACCOUNT);

    await userModelService.createUser({
      email,
      password: hashedPassword,
      metamaskAddress: null,
    });
    sendResponse(res, STATUSES.CREATED, { message: SUCCESS.REGISTER_SUCCESSFUL });
  }),
);

router.post(
  '/login',
  handleCallback(async (req, res) => {
    const { email, password } = req.body;

    const user = await userModelService.findUser(email);

    if (!user) return handleError(res, STATUSES.BAD_REQUEST, ERRORS.NO_SUCH_USER);

    const result = await bcrypt.compare(password, user.password);

    if (!result) return handleError(res, STATUSES.BAD_REQUEST, ERRORS.INCORRECT_EMAIL_OR_PASSWORD);

    const token = JWTService.generateToken({ email: user.email });
    sendResponse(res, STATUSES.OK, {
      message: SUCCESS.LOGIN_SUCCESSFUL,
      email: user.email,
      token,
    });
  }),
);

router.post(
  '/login-metamask',
  handleCallback(async (req, res) => {
    const { metamaskAddress } = req.body;

    const user = await userModelService.findUser(metamaskAddress, false);

    if (!user)
      await userModelService.createUser({
        metamaskAddress,
        password: null,
        email: null,
      });

    const token = JWTService.generateToken({ metamaskAddress });

    sendResponse(res, STATUSES.OK, {
      message: SUCCESS.LOGIN_SUCCESSFUL,
      metamaskAddress,
      token,
    });
  }),
);

router.post(
  '/forgot-password',
  handleCallback(async (req, res) => {
    const { email } = req.body;

    const validationResult = await validateEmail(res, email);

    if (!validationResult) return;

    const user = await userModelService.findUser(email);

    if (!user) return handleError(res, STATUSES.UNPROCESSABLE_CONTENT, ERRORS.NO_SUCH_USER);

    const token = JWTService.generateToken({ id: user._id });

    const encodedToken = encodeURIComponent(token);

    NodemailerService.sendMailViaGmail(res, {
      to: email,
      subject: 'Reset password',
      text: `Follow link to reset password: ${process.env.FRONT_END_BASE_URL}/reset-password/${user._id}?token=${encodedToken}`,
    });
  }),
);

router.post(
  '/reset-password',
  handleCallback(async (req, res) => {
    const { id, token, password } = req.body;

    const verificationResult = JWTService.verifyToken(token);

    const validationResult = await validatePassword(res, password);

    if (!validationResult) return;

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    if (verificationResult.valid) {
      await userModelService.updateUserPasswordById({ _id: id }, hashedPassword);
      sendResponse(res, STATUSES.OK, { message: SUCCESS.PASSWORD_WAS_RESET });
    } else {
      handleError(res, STATUSES.BAD_REQUEST, ERRORS.TOKEN_INVALID);
    }
  }),
);

router.delete(
  '/logout',
  auth,
  handleCallback(async (req, res) => {
    sendResponse(res, STATUSES.OK, { message: SUCCESS.LOGOUT_SUCCESSFUL });
  }),
);

module.exports = router;
