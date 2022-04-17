const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');
const isLogin = require('../middleware/auth')

// -----------> User Manager
router.put('/users', adminController.updateUser);
router.post('/users', adminController.createUser);
router.post('/users/reset-password', adminController.resetPassword);
router.delete('/users', adminController.deleteUser);
router.get('/users', isLogin, adminController.getUser);

//---------> Lottery Manager
router.get('/test', adminController.getLottery);

router.put('/lottery', adminController.updateLottery);
router.post('/lottery', adminController.createLottery);
router.delete('/lottery', adminController.deleteLottery);
router.delete('/lottery/multidelete', adminController.deleteMultiLottery);
router.get('/provinces', adminController.getProvinces);

// ---------> Add Data
router.get('/add-hard-data', adminController.addHardData);

module.exports = router;
