const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');

router.get('/profile', auth, userController.getProfile);
router.put('/profile', auth, userController.updateProfile);
router.put('/change-password', auth, userController.changePassword);
router.post('/wishlist', auth, userController.addToWishlist);
router.delete('/wishlist/:productId', auth, userController.removeFromWishlist);
router.get('/wishlist', auth, userController.getWishlist);
router.delete('/account', auth, userController.deleteAccount);
router.get('/all', auth, roleCheck('admin'), userController.getAllUsers);

module.exports = router;
