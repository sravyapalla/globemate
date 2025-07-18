// src/controllers/costController.js
const Cost = require('../models/Cost');

exports.listCities = async (req, res) => {
  try {
    const cities = await Cost.distinct('city');
    return res.json(cities.slice(0, 50));
  } catch (err) {
    console.error('❌ listCities error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getCost = async (req, res) => {
  try {
    const city = (req.query.city || '').trim();
    if (!city) {
      return res.status(400).json({ error: 'Missing city ' });
    }

    // substring, case-insensitive match
    const record = await Cost.findOne({
      city: { $regex: city, $options: 'i' }
    });
console.log('DB record:', record);
    if (!record) {

      return res.status(404).json({ error: 'City not found' });
    }

    // Return the exact fields from your JSON, but in camelCase:
    return res.json({
      city:                       record.city,
      country:                    record.country,
      costOfLivingAndRentIndex:   record.Cost_of_Living_and_Rent_Index,
      groceriesIndex:             record.groceries,
      restaurantPriceIndex:       record.restaurant,
      localPurchasingPowerIndex:  record.Local_purchasing
    });
  } catch (err) {
    console.error('❌ getCost error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
