const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');

require('dotenv').config();

const UserModel = require('../models/Users');
const handleError = require('../helpers/handleError');

router.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (user) return handleError(res, 422, 'Already have an account');

    await UserModel.create({ email, password });
    res.status(201).json({ message: 'You successfully registered! Please log in' });
  } catch (error) {
    handleError(res, 500, 'Internal server error');
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (!user) return handleError(res, 400, 'No such user. Please register');

    if (user.password !== password)
      return handleError(res, 400, 'Incorrect email or password');

    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET_KEY, {
      expiresIn: '1d',
    });

    res.status(201).json({
      message: 'Login Successful',
      email: user.email,
      token,
    });
  } catch (error) {
    handleError(res, 500, 'Internal server error');
  }
});

module.exports = router;
