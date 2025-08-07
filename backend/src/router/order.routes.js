const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');
const { verifyToken, isAdmin } = require('../middleware/auth.middleware');

router.post('/', verifyToken, orderController.createOrder);
router.get('/', verifyToken, isAdmin, orderController.getAllOrders);
router.get('/user/:id', verifyToken, orderController.getOrdersByUser);
router.put('/:id', verifyToken, isAdmin, orderController.updateOrderStatus);

module.exports = router;