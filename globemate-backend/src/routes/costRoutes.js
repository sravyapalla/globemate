const router  = require('express').Router();
const { getCost, listCities } = require('../controllers/costController');

router.get('/', getCost);
router.get('/cities', listCities); 

module.exports = router;