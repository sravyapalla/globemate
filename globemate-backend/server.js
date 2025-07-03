// server.js
require('dotenv').config();
const mongoose = require('mongoose');
const app      = require('./src/app');

const PORT = process.env.PORT || 5000;
const URI  = process.env.MONGO_URI;

mongoose
  .connect(URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log(` GlobeMate API listening on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
