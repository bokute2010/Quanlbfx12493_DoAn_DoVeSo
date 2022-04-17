const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

router.get('/registerUser', authController.postRegisterUser);
router.get('/registerAdmin', authController.postRegisterAdmin);

router.post('/login', authController.postLogin)

module.exports = router;