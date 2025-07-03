// scripts/processCost.js
const fs   = require('fs');
const path = require('path');
const csv  = require('csv-parser');

const inputFile  = path.join(__dirname, '../data/cost_of_living.csv');
const outputFile = path.join(__dirname, '../data/cost_of_living.json');

const rows = [];

fs.createReadStream(inputFile)
  .pipe(csv())
  .on('data', (row) => {
     const [cityName, fallbackCountry] = (row['City'] || '').split(',').map(s => s.trim());
   rows.push({
    city:    cityName   || 'Unknown',
  country:   row['Country']?.trim() || fallbackCountry || 'Unknown',
  Cost_of_Living_and_Rent_Index:
     parseFloat(row['Cost of Living Plus Rent Index']) || null,
  groceries:  parseFloat(row['Groceries Index']) || null,
  restaurant: parseFloat(row['Restaurant Price Index']) || null,
  Local_purchasing:
     parseFloat(row['Local Purchasing Power Index']) || null,
});

  })
  .on('end', () => {
    fs.writeFileSync(outputFile, JSON.stringify(rows, null, 2), 'utf-8');
    console.log(`Wrote ${rows.length} records to ${outputFile}`);
  })
  .on('error', (err) => {
    console.error(' Error processing CSV:', err);
  });
