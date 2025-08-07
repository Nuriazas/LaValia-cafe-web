const express = require('express');
const router = express.Router();
const aboutController = require('../controllers/about.controller');
const { verifyToken, isAdmin } = require('../middleware/auth.middleware');

router.get('/', aboutController.getAboutContent);
router.put('/', verifyToken, isAdmin, aboutController.updateAboutContent);

module.exports = router;
