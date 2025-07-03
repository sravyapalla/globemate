// src/models/cost.js
const { Schema, model } = require('mongoose');

const CostSchema = new Schema({
  city:                          { type: String, required: true },
  country:                       { type: String, required: true },
  Cost_of_Living_and_Rent_Index: { type: Number },
  groceries:                     { type: Number },
  restaurant:                    { type: Number },
  Local_purchasing:              { type: Number }
}, {
  strict: true   // now correctly passed as the second argument
});

module.exports = model('Cost', CostSchema);

