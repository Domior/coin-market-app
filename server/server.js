const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const io = require('socket.io');
const axios = require('axios');
require('dotenv').config();

const dbConnect = require('./db/dbConnect');
const authRoutes = require('./routes/authRoutes');
const appRoutes = require('./routes/appRoutes');
const SOCKET_EVENTS = require('./constants/socket');
const REQUEST_DEFAULT_PARAMS = require('./constants/params');
const STATUSES = require('./constants/statuses');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

app.use(authRoutes);
app.use(appRoutes);

dbConnect();

const server = http.createServer(app);

const socketServer = io(server, {
  cors: {
    origin: '*',
  },
});

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
      error.response.status === STATUSES.TOO_MANY_REQUESTS ? 'Too many requests. Please try again later' : 'Something went wrong. Try again later',
    );
  }
};

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

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
