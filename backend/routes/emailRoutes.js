const express = require('express');
const { syncEmails } = require('../controllers/emailController');
const router = express.Router();

// Route to synchronize emails
router.get('/sync/:userId', syncEmails);

module.exports = router;
