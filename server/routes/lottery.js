const express = require('express');
const router = express.Router();
const loterryController = require('../controllers/lottery');

router.put('/lottery', loterryController.updateLottery);
router.post('/lottery', loterryController.createLottery);
router.delete('/lottery', loterryController.deleteLottery);
router.delete('/lottery/multidelete', loterryController.deleteMultiLottery);

router.get('/provinces', loterryController.getProvinces);


router.get('/add-hard-data', loterryController.addHardData);

module.exports = router;
