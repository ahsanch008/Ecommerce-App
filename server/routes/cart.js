const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const auth = require('../middleware/authorization');

router.get('/',auth.authenticated, cartController.getCart);
router.post('/add',auth.authenticated, cartController.addToCart);
router.put('/update',auth.authenticated, cartController.updateCartItem);
router.delete('/remove/:productId',auth.authenticated, cartController.removeFromCart);
router.delete('/clear',auth.authenticated, cartController.clearCart);

module.exports = router;
