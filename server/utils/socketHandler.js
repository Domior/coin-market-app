const io = require('socket.io');
const axios = require('axios');

const { ERRORS } = require('../constants/text');
const REQUEST_DEFAULT_PARAMS = require('../constants/params');
const SOCKET_EVENTS = require('../constants/socket');
const STATUSES = require('../constants/statuses');

const handleChartData = async (socket, data) => {
  const { id, vs_currency = REQUEST_DEFAULT_PARAMS.vs_currency, days = REQUEST_DEFAULT_PARAMS.days } = data;

  const params = {
    vs_currency,
    days,
  };

  try {
    const { data: chartData } = await axios.get(`${process.env.COINGECKO_URL}/coins/${id}/market_chart`, { params });
    socket.emit(SOCKET_EVENTS.RECEIVE_CHART_DATA, chartData);
  } catch (error) {
    console.log(error);

    socket.emit(
      SOCKET_EVENTS.RECEIVE_CHART_DATA_ERROR,
      error.response.status === STATUSES.TOO_MANY_REQUESTS ? ERRORS.TOO_MANY_REQUESTS : ERRORS.SOMETHING_WENT_WRONG,
    );
  }
};

const initializeSocket = server => {
  const socketServer = io(server, {
    cors: {
      origin: '*',
    },
  });

  socketServer.on(SOCKET_EVENTS.CONNECTION, socket => {
    socket.on(SOCKET_EVENTS.START, () => {
      console.log('started');
    });

    socket.on(SOCKET_EVENTS.GET_CHART_DATA, async data => {
      await handleChartData(socket, data);
    });

    socket.on(SOCKET_EVENTS.DISCONNECT, () => {
      console.log('disconnected');
    });
  });
};

module.exports = { initializeSocket };
