const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.get('/add-history', userController.addHistoryCheck);

module.exports = router;