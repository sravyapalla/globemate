// scripts/seedCosts.js
require('dotenv').config();
const mongoose = require('mongoose');
const Cost     = require('../src/models/Cost');
const data     = require('../data/cost_of_living.json');

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);           // no options needed in v7+
    console.log('✅ MongoDB connected for seeding');

    await Cost.deleteMany({});
    console.log('🗑️  Cleared old cost data');

    const inserted = await Cost.insertMany(data);
    console.log(`✅ Seeded ${inserted.length} records`);

  } catch (err) {
    console.error('❌ Seeding error:', err);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

seed();
