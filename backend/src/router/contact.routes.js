const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contact.controller');
const { verifyToken, isAdmin } = require('../middleware/auth.middleware');

router.post('/', contactController.createContactMessage);
router.get('/', verifyToken, isAdmin, contactController.getAllMessages);

module.exports = router;
