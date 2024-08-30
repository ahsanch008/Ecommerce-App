const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');

router.post('/', auth, orderController.createOrder);
router.get('/', auth, orderController.getOrders);
router.get('/:id', auth, orderController.getOrderById);
router.put('/:id/status', auth, roleCheck('admin'), orderController.updateOrderStatus);
router.put('/:id/cancel', auth, orderController.cancelOrder);
router.get('/all', auth, roleCheck('admin'), orderController.getAllOrders);

module.exports = router;
