const express = require('express');
const router = express.Router();
const axios = require('axios');

const auth = require('../auth');
const FavoritesModel = require('../models/Favorites');
const STATUSES = require('../constants/statuses');
const REQUEST_DEFAULT_PARAMS = require('../constants/params');
const DBService = require('../services/DBService');
const handleCallback = require('../helpers/handleCallback');

const favoritesModelService = new DBService(FavoritesModel);

router.get(
  '/coins',
  auth,
  handleCallback(async (req, res) => {
    const { vs_currency = REQUEST_DEFAULT_PARAMS.vs_currency } = req.body;
    const { email, metamaskAddress } = req.user;

    const params = {
      vs_currency,
      order: REQUEST_DEFAULT_PARAMS.order,
      per_page: REQUEST_DEFAULT_PARAMS.per_page,
      page: REQUEST_DEFAULT_PARAMS.page,
    };

    const { data } = await axios.get(`${process.env.COINGECKO_URL}/coins/markets`, {
      params,
    });

    const item = await favoritesModelService.findFavorites({
      email,
      metamaskAddress,
    });

    if (!item) {
      await favoritesModelService.createFavorites({
        email,
        metamaskAddress,
        favorites: [],
      });
    } else {
      const newData = data.map(coin => {
        return {
          ...coin,
          isFavorite: item.favorites.includes(coin.id),
        };
      });
      return res.status(STATUSES.OK).json({ data: newData });
    }

    return res.status(STATUSES.OK).json({ data });
  }),
);

router.get(
  '/coins/:id',
  auth,
  handleCallback(async (req, res) => {
    const { id } = req.params;

    const { data } = await axios.get(`${process.env.COINGECKO_URL}/coins/${id}`);
    res.status(STATUSES.OK).json({ data });
  }),
);

router.patch(
  '/favorites/:coinId',
  auth,
  handleCallback(async (req, res) => {
    const { coinId } = req.params;
    const { email, metamaskAddress } = req.user;

    const item = await favoritesModelService.findFavorites({
      email,
      metamaskAddress,
    });

    if (item) {
      if (!item.favorites.includes(coinId)) {
        item.favorites.push(coinId);
        await item.save();
      } else {
        item.favorites = item.favorites.filter(item => item !== coinId);
        await item.save();
      }
    } else {
      await favoritesModelService.createFavorites({
        email,
        metamaskAddress,
        favorites: [coinId],
      });
    }

    res.status(STATUSES.OK).json({ coinId });
  }),
);

router.get(
  '/chart/:id',
  auth,
  handleCallback(async (req, res) => {
    const { id } = req.params;
    const { vs_currency = REQUEST_DEFAULT_PARAMS.vs_currency, days = REQUEST_DEFAULT_PARAMS.days } = req.query;

    const params = {
      vs_currency,
      days,
    };

    const { data } = await axios.get(`${process.env.COINGECKO_URL}/coins/${id}/market_chart`, { params });
    res.status(STATUSES.OK).json({ data });
  }),
);

module.exports = router;
