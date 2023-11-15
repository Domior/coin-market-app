const express = require('express');
const router = express.Router();

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

    await UserModel.create({ email, password });
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

    res.status(STATUSES.CREATED).json({
      message: 'Login Successful',
      email: user.email,
      token,
    });
  } catch (error) {
    handleError(res, STATUSES.INTERNAL_SERVER_ERROR, 'Internal server error');
  }
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
