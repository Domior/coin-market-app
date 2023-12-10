const mongoose = require('mongoose');

const { MONGODB } = require('../constants/text');

module.exports = async () => {
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log(MONGODB.CONNECTED);
    })
    .catch(error => {
      console.log(MONGODB.UNABLE_CONNECT);
      console.error(error);
    });
};
