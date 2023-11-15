const mongoose = require('mongoose');

const COLLECTIONS = require('../constants/collections');

const FavoritesSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  favorites: { type: Array, required: true },
});

const FavoritesModel = mongoose.model(COLLECTIONS.FAVORITES, FavoritesSchema);
module.exports = FavoritesModel;
