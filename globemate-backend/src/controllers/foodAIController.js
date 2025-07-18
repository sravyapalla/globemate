// src/controllers/foodAIController.js
require('dotenv').config();
const NodeCache = require('node-cache');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const cache = new NodeCache({
  stdTTL: Number(process.env.CACHE_TTL) || 600,
  checkperiod: 120,
});

const geminiKey = process.env.GEMINI_API_KEY;
if (!geminiKey) {
  console.error('🔑 GEMINI_API_KEY is missing in your .env');
}

const genAI = new GoogleGenerativeAI(geminiKey);

// Pick the model you tested with `genAI.listModels()`
const model = genAI.getGenerativeModel({ model: 'gemini-1.0-pro' });

exports.getFoodRecs = async (req, res) => {
  const city = (req.query.city || '').trim();
  if (!city) {
    return res.status(400).json({ error: 'Missing city query parameter' });
  }

  const key = `foods:${city.toLowerCase()}`;
  if (cache.has(key)) {
    return res.json(cache.get(key));
  }

  try {
    // 1) Prompt Gemini for 10 dishes + shop names, JSON only
    const prompt = [
      `You are a local food expert. List the 10 most famous traditional dishes in ${city},`,
      `in a JSON array of objects like:`,
      `[{"name":"Dish1","shop_name":"Famous Shop1"}, … , {"name":"Dish10","shop_name":"Famous Shop10"}]`,
      `Do not include any extra text or markdown—only the JSON array.`
    ].join(' ');

    const gen = await model.generateContent(prompt);
    const response = await gen.response;
    let text = response.text();

    // strip code fences if any
    text = text.replace(/^```json\s*/, '').replace(/\s*```$/, '').trim();

    // parse it
    const dishes = JSON.parse(text);
    if (!Array.isArray(dishes) || dishes.length < 1) {
      throw new Error('AI returned no dishes');
    }

    // trim/extract exactly 10 items
    const result = dishes.slice(0, 10).map((d, i) => ({
      name: d.name || `Dish #${i + 1}`,
      shop_name: d.shop_name || 'Local popular spot'
    }));

    cache.set(key, result);
    return res.json(result);

  } catch (err) {
    console.error('❌ getFoodRecs error (Gemini):', err);
    // specialized error messages
    if (err.message.includes('401') || err.message.includes('API key')) {
      return res.status(500).json({ error: 'AI key invalid or missing.' });
    }
    if (err.message.includes('model not found')) {
      return res.status(500).json({ error: 'Requested AI model not available.' });
    }

    // generic fallback
    return res
      .status(500)
      .json({ error: 'Food recommendations temporarily unavailable.' });
  }
};
