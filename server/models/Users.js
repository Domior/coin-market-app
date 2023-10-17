const mongoose = require('mongoose');

const COLLECTIONS = require('../constants/collections');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const UserModel = mongoose.model(COLLECTIONS.USERS, UserSchema);
module.exports = UserModel;
