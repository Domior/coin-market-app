const express = require('express');
const router = express.Router();
const axios = require('axios');

const auth = require('../auth');
const handleError = require('../helpers/handleError');
const FavoritesModel = require('../models/Favorites');
const STATUSES = require('../constants/statuses');
const REQUEST_DEFAULT_PARAMS = require('../constants/params');
const { ERRORS } = require('../constants/text');

router.get('/coins', auth, async (req, res) => {
  const { vs_currency = REQUEST_DEFAULT_PARAMS.vs_currency } = req.body;
  const { email, metamaskAddress } = req.user;

  const params = {
    vs_currency,
    order: REQUEST_DEFAULT_PARAMS.order,
    per_page: REQUEST_DEFAULT_PARAMS.per_page,
    page: REQUEST_DEFAULT_PARAMS.page,
  };

  try {
    const { data } = await axios.get(`${process.env.COINGECKO_URL}/coins/markets`, { params });

    const item = await FavoritesModel.findOne(email ? { userEmail: email } : { userMetamaskAddress: metamaskAddress });

    if (!item) {
      await FavoritesModel.create(email ? { userEmail: email, favorites: [] } : { userMetamaskAddress: metamaskAddress, favorites: [] });
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
    if (error.response.status === STATUSES.TOO_MANY_REQUESTS) return handleError(res, STATUSES.TOO_MANY_REQUESTS, ERRORS.TOO_MANY_REQUESTS);
    handleError(res, STATUSES.INTERNAL_SERVER_ERROR, ERRORS.INTERNAL_SERVER_ERROR);
  }
});

router.get('/coins/:id', auth, async (req, res) => {
  const { id } = req.params;

  try {
    const { data } = await axios.get(`${process.env.COINGECKO_URL}/coins/${id}`);
    res.status(STATUSES.OK).json({ data });
  } catch (error) {
    console.log(error);
    if (error.response.status === STATUSES.TOO_MANY_REQUESTS) return handleError(res, STATUSES.TOO_MANY_REQUESTS, ERRORS.TOO_MANY_REQUESTS);
    handleError(res, STATUSES.INTERNAL_SERVER_ERROR, ERRORS.INTERNAL_SERVER_ERROR);
  }
});

router.patch('/favorites/:coinId', auth, async (req, res) => {
  const { coinId } = req.params;
  const { email, metamaskAddress } = req.user;

  try {
    const item = await FavoritesModel.findOne(email ? { userEmail: email } : { userMetamaskAddress: metamaskAddress });

    if (item) {
      if (!item.favorites.includes(coinId)) {
        item.favorites.push(coinId);
        await item.save();
      } else {
        item.favorites = item.favorites.filter(item => item !== coinId);
        await item.save();
      }
    } else {
      await FavoritesModel.create(email ? { userEmail: email, favorites: [coinId] } : { userMetamaskAddress: metamaskAddress, favorites: [coinId] });
    }

    res.status(STATUSES.OK).json({ coinId });
  } catch (error) {
    console.log(error);
    handleError(res, STATUSES.INTERNAL_SERVER_ERROR, ERRORS.INTERNAL_SERVER_ERROR);
  }
});

router.get('/chart/:id', auth, async (req, res) => {
  const { id } = req.params;
  const { vs_currency = REQUEST_DEFAULT_PARAMS.vs_currency, days = REQUEST_DEFAULT_PARAMS.days } = req.query;

  const params = {
    vs_currency,
    days,
  };

  try {
    const { data } = await axios.get(`${process.env.COINGECKO_URL}/coins/${id}/market_chart`, { params });
    res.status(STATUSES.OK).json({ data });
  } catch (error) {
    console.log(error);
    handleError(res, STATUSES.INTERNAL_SERVER_ERROR, ERRORS.INTERNAL_SERVER_ERROR);
  }
});

module.exports = router;
