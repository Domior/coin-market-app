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

const saltRounds = 10;

router.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await UserModel.findOne({ email });

    if (user) return handleError(res, STATUSES.UNPROCESSABLE_CONTENT, ERRORS.ALREADY_HAVE_ACCOUNT);

    await UserModel.create({ email, password: hashedPassword, metamaskAddress: null });
    sendResponse(res, STATUSES.CREATED, { message: SUCCESS.REGISTER_SUCCESSFUL });
  } catch (error) {
    handleError(res, STATUSES.INTERNAL_SERVER_ERROR, ERRORS.INTERNAL_SERVER_ERROR);
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (!user) return handleError(res, STATUSES.BAD_REQUEST, ERRORS.NO_SUCH_USER);

    const result = await bcrypt.compare(password, user.password);

    if (!result) return handleError(res, STATUSES.BAD_REQUEST, ERRORS.INCORRECT_EMAIL_OR_PASSWORD);

    const token = JWTService.generateToken({ email: user.email });
    sendResponse(res, STATUSES.OK, {
      message: SUCCESS.LOGIN_SUCCESSFUL,
      email: user.email,
      token,
    });
  } catch (error) {
    handleError(res, STATUSES.INTERNAL_SERVER_ERROR, ERRORS.INTERNAL_SERVER_ERROR);
  }
});

router.post('/login-metamask', async (req, res) => {
  const { metamaskAddress } = req.body;

  try {
    const user = await UserModel.findOne({ metamaskAddress });

    if (!user) await UserModel.create({ metamaskAddress, password: null, email: null });

    const token = JWTService.generateToken({ metamaskAddress });

    sendResponse(res, STATUSES.OK, {
      message: SUCCESS.LOGIN_SUCCESSFUL,
      metamaskAddress,
      token,
    });
  } catch (error) {
    handleError(res, STATUSES.INTERNAL_SERVER_ERROR, ERRORS.INTERNAL_SERVER_ERROR);
  }
});

router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (!user) return handleError(res, STATUSES.UNPROCESSABLE_CONTENT, ERRORS.NO_SUCH_USER);

    const token = JWTService.generateToken({ id: user._id });

    const encodedToken = encodeURIComponent(token);

    NodemailerService.sendMailViaGmail(res, {
      to: email,
      subject: 'Reset password',
      text: `Follow link to reset password: ${process.env.FRONT_END_BASE_URL}/reset-password/${user._id}?token=${encodedToken}`,
    });
  } catch (error) {
    handleError(res, STATUSES.INTERNAL_SERVER_ERROR, ERRORS.INTERNAL_SERVER_ERROR);
  }
});

router.post('/reset-password', async (req, res) => {
  const { id, token, password } = req.body;

  const verificationResult = JWTService.verifyToken(token);

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  if (verificationResult.valid) {
    try {
      await UserModel.findByIdAndUpdate({ _id: id }, { password: hashedPassword });
      sendResponse(res, STATUSES.OK, { message: SUCCESS.PASSWORD_WAS_RESET });
    } catch (error) {
      handleError(res, STATUSES.INTERNAL_SERVER_ERROR, ERRORS.INTERNAL_SERVER_ERROR);
    }
  } else {
    handleError(res, STATUSES.BAD_REQUEST, ERRORS.TOKEN_INVALID);
  }
});

router.delete('/logout', auth, async (req, res) => {
  try {
    sendResponse(res, STATUSES.OK, { message: SUCCESS.LOGOUT_SUCCESSFUL });
  } catch (error) {
    handleError(res, STATUSES.INTERNAL_SERVER_ERROR, ERRORS.INTERNAL_SERVER_ERROR);
  }
});

module.exports = router;
