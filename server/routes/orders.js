const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const auth = require('../middleware/authorization');
const roleCheck = require('../middleware/roleCheck');

router.post('/',auth.authenticated, orderController.createOrder);
router.get('/',auth.authenticated, orderController.getOrders);
router.get('/user',auth.authenticated, orderController.getUserOrders);
router.get('/:id',auth.authenticated, orderController.getOrderById);
router.put('/:id/status',auth.authenticated, orderController.updateOrderStatus);
router.put('/:id/cancel',auth.authenticated, orderController.cancelOrder);
router.get('/all',auth.authenticated, orderController.getAllOrders);

module.exports = router;
