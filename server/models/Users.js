const mongoose = require('mongoose');

const COLLECTIONS = require('../constants/collections');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  metamaskAddress: {
    type: String,
  },
});

const UserModel = mongoose.model(COLLECTIONS.USERS, UserSchema);
module.exports = UserModel;
