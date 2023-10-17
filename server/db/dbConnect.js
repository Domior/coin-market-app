const mongoose = require('mongoose');
require('dotenv').config();

module.exports = async () => {
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('Successfully connected to MongoDB!');
    })
    .catch(error => {
      console.log('Unable to connect to MongoDB!');
      console.error(error);
    });
};
