// src/app.js
require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const helmet  = require('helmet');
const morgan  = require('morgan');
const rateLimit = require('express-rate-limit');

const weatherRoutes = require('./routes/weatherRoutes');
const costRoutes    = require('./routes/costRoutes');
const foodAIRoutes = require('./routes/foodAIRoutes');
const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));
app.use(rateLimit({ windowMs: 60_000, max: 60 }));

// Mount the weather API
app.use('/api/weather', weatherRoutes);
app.use('/api/cost-of-living', costRoutes);  
app.use('/api/ai-foods', require('./routes/foodAIRoutes'));

// 404 for anything else
app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

module.exports = app;
