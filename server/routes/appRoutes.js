const express = require('express');
const router = express.Router();
const axios = require('axios');

require('dotenv').config();

const auth = require('../auth');
const handleError = require('../helpers/handleError');

const DEFAULT_PARAMS = {
  vs_currency: 'usd',
  order: 'market_cap_desc',
  per_page: '100',
  page: '1',
};

router.get('/coins', auth, async (req, res) => {
  const { vs_currency = DEFAULT_PARAMS.vs_currency } = req.body;

  const params = {
    vs_currency,
    order: DEFAULT_PARAMS.order,
    per_page: DEFAULT_PARAMS.per_page,
    page: DEFAULT_PARAMS.page,
  };

  try {
    const { data } = await axios.get(`${process.env.COINGECKO_URL}/coins/markets`, { params });
    res.status(200).json({ data });
  } catch (error) {
    console.log(error);
    handleError(res, 500, 'Internal server error');
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
