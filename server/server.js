const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
require('dotenv').config();

const { initializeSocket } = require('./utils/socketHandler');
const dbConnect = require('./db/dbConnect');
const authRoutes = require('./routes/authRoutes');
const appRoutes = require('./routes/appRoutes');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

app.use(authRoutes);
app.use(appRoutes);

dbConnect();

const server = http.createServer(app);

initializeSocket(server);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
