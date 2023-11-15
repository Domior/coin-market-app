const express = require('express');
const router = express.Router();
const axios = require('axios');

require('dotenv').config();

const auth = require('../auth');
const handleError = require('../helpers/handleError');
const FavoritesModel = require('../models/Favorites');
const STATUSES = require('../constants/statuses');

const DEFAULT_PARAMS = {
  vs_currency: 'usd',
  order: 'market_cap_desc',
  per_page: '100',
  page: '1',
};

router.get('/coins', auth, async (req, res) => {
  const { vs_currency = DEFAULT_PARAMS.vs_currency } = req.body;
  const { email } = req.user;

  const params = {
    vs_currency,
    order: DEFAULT_PARAMS.order,
    per_page: DEFAULT_PARAMS.per_page,
    page: DEFAULT_PARAMS.page,
  };

  try {
    const { data } = await axios.get(`${process.env.COINGECKO_URL}/coins/markets`, { params });

    const item = await FavoritesModel.findOne({ userEmail: email });

    if (!item) {
      await FavoritesModel.create({ userEmail: email, favorites: [] });
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
  } catch (error) {
    console.log(error);
    handleError(res, STATUSES.INTERNAL_SERVER_ERROR, 'Internal server error');
  }
});

router.get('/coins/:id', auth, async (req, res) => {
  const { id } = req.params;

  try {
    const { data } = await axios.get(`${process.env.COINGECKO_URL}/coins/${id}`);
    res.status(STATUSES.OK).json({ data });
  } catch (error) {
    console.log(error);
    handleError(res, STATUSES.INTERNAL_SERVER_ERROR, 'Internal server error');
  }
});

router.patch('/favorites/:coinId', auth, async (req, res) => {
  const { coinId } = req.params;
  const { email } = req.user;

  try {
    const item = await FavoritesModel.findOne({ userEmail: email });

    if (item) {
      if (!item.favorites.includes(coinId)) {
        item.favorites.push(coinId);
        await item.save();
      } else {
        item.favorites = item.favorites.filter(item => item !== coinId);
        await item.save();
      }
    } else {
      await FavoritesModel.create({ userEmail: email, favorites: [coinId] });
    }

    res.status(STATUSES.OK).json({ coinId });
  } catch (error) {
    console.log(error);
    handleError(res, STATUSES.INTERNAL_SERVER_ERROR, 'Internal server error');
  }
});

router.get('/coins/:id', auth, async (req, res) => {
  const { id } = req.params;

  try {
    const { data } = await axios.get(`${process.env.COINGECKO_URL}/coins/${id}`);
    res.status(200).json({ data });
  } catch (error) {
    console.log(error);
    handleError(res, 500, 'Internal server error');
  }
});

module.exports = router;
