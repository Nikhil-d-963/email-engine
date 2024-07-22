const express = require('express');
const { authenticateUser, callback } = require('../controllers/authController');
const router = express.Router();

router.get('/auth', authenticateUser);
router.get('/auth/callback', callback);

module.exports = router;
