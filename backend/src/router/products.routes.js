const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const verifyToken = require('../middleware/auth');

router.get('/', productController.getAllProducts);

// Ruta protegida
router.post('/', verifyToken, productController.createProduct);

module.exports = router;