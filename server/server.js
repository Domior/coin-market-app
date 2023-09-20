const express = require('express');
const app = express();
const cors = require('cors');

const PORT = 4000;

app.use(cors());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
