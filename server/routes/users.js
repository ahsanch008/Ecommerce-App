const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticated, authorization } = require('../middleware/authorization');
//a get request on /user/signup will call showsignupform function which in turn will render the html or ejs file
router.post('/signup',userController.createUser);
router.get('/profile', authenticated, userController.getProfile);
//a get request on /user/login will call showloginform function which in turn will render the html or ejs file

router.post('/login',userController.loginUser);
router.put('/:id', userController.updateProfile);
router.get('/logout',userController.logoutUser);

router.put('/change-password', userController.changePassword);
router.post('/wishlist', userController.addToWishlist);
router.delete('/wishlist/:productId', userController.removeFromWishlist);
router.get('/wishlist', userController.getWishlist);
router.get('/all', userController.getAllUsers);

module.exports = router;
