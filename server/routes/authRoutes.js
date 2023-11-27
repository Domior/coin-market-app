const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const UserModel = require('../models/Users');
const handleError = require('../helpers/handleError');
const auth = require('../auth');
const STATUSES = require('../constants/statuses');

router.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (user) return handleError(res, STATUSES.UNPROCESSABLE_CONTENT, 'Already have an account');

    await UserModel.create({ email, password, metamaskAddress: null });
    res.status(STATUSES.CREATED).json({ message: 'You successfully registered! Please log in' });
  } catch (error) {
    handleError(res, STATUSES.INTERNAL_SERVER_ERROR, 'Internal server error');
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (!user) return handleError(res, STATUSES.BAD_REQUEST, 'No such user. Please register');

    if (user.password !== password) return handleError(res, STATUSES.BAD_REQUEST, 'Incorrect email or password');

    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET_KEY, {
      expiresIn: '1d',
    });

    res.status(STATUSES.OK).json({
      message: 'Login Successful',
      email: user.email,
      token,
    });
  } catch (error) {
    handleError(res, STATUSES.INTERNAL_SERVER_ERROR, 'Internal server error');
  }
});

router.post('/login-metamask', async (req, res) => {
  const { metamaskAddress } = req.body;

  try {
    const user = await UserModel.findOne({ metamaskAddress });

    if (!user) await UserModel.create({ metamaskAddress, password: null, email: null });

    const token = jwt.sign({ metamaskAddress }, process.env.JWT_SECRET_KEY, {
      expiresIn: '1d',
    });

    res.status(STATUSES.OK).json({
      message: 'Login Successful',
      metamaskAddress,
      token,
    });
  } catch (error) {
    handleError(res, STATUSES.INTERNAL_SERVER_ERROR, 'Internal server error');
  }
});

router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (!user) return handleError(res, STATUSES.UNPROCESSABLE_CONTENT, 'No such user. Please register');

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: '1d',
    });

    const encodedToken = encodeURIComponent(token);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.NODEMAILER_EMAIL,
      to: email,
      subject: 'Reset password',
      text: `Follow link to reset password: ${process.env.FRONT_END_BASE_URL}/reset-password/${user._id}?token=${encodedToken}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        res.status(STATUSES.OK).json({ message: 'Reset password link was successfully sent to your email' });
      }
    });
  } catch (error) {
    handleError(res, STATUSES.INTERNAL_SERVER_ERROR, 'Internal server error');
  }
});

router.post('/reset-password', async (req, res) => {
  const { id, token, password } = req.body;

  jwt.verify(token, process.env.JWT_SECRET_KEY, (error, decoded) => {
    if (error) return res.status(STATUSES.BAD_REQUEST).json({ message: 'Token is invalid' });
    UserModel.findByIdAndUpdate({ _id: id }, { password }).then(() =>
      res.status(STATUSES.OK).json({ message: 'Your password was successfully reset. Please log in' }),
    );
  });
});

router.delete('/logout', auth, async (req, res) => {
  try {
    res.status(STATUSES.OK).json({
      data: { message: 'Logout Successful' },
    });
  } catch (error) {
    handleError(res, STATUSES.INTERNAL_SERVER_ERROR, 'Internal server error');
  }
});

module.exports = router;
