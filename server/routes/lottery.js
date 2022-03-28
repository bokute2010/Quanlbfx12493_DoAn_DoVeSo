const express = require('express');
const router = express.Router();
const loterryController = require('../controllers/lottery');

router.post('/add-lottery', loterryController.createLottery);

router.get('/provinces', loterryController.getProvinces);


module.exports = router;
