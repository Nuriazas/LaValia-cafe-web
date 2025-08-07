const express = require('express');
const router = express.Router();
const newsletterController = require('../controllers/newsletter.controller');
const { verifyToken, isAdmin } = require('../middleware/auth.middleware');

router.post('/', newsletterController.subscribe);
router.get('/', verifyToken, isAdmin, newsletterController.getAllSubscribers);

module.exports = router;
