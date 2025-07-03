// src/controllers/weatherController.js
const axios = require('axios');
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: Number(process.env.CACHE_TTL) || 600 });

exports.getWeather = async (req, res) => {
  const city = req.query.city;
  if (!city) return res.status(400).json({ error: 'Missing city query parameter' });

  const key = city.toLowerCase();
  if (cache.has(key)) {
    return res.json(cache.get(key));
  }

  try {
    const { data } = await axios.get(
      'https://api.openweathermap.org/data/2.5/weather', {
        params: {
          q: city,
          units: 'metric',
          appid: process.env.OPENWEATHER_API_KEY
        }
      }
    );

    const result = {
      temp: data.main.temp,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      fetchedAt: new Date().toISOString()
    };

    cache.set(key, result);
    res.json(result);
  } catch (err) {
    const message = err.response?.data?.message || err.message;
    res.status(500).json({ error: message });
  }
};
