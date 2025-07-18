// src/routes/foodAIRoutes.js

const router = require('express').Router();
const { getFoodRecs } = require('../controllers/foodAIController');
router.get('/', getFoodRecs);
module.exports = router;
