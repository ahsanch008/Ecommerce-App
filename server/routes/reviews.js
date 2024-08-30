const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');

router.post('/', auth, reviewController.createReview);
router.get('/product/:productId', reviewController.getProductReviews);
router.put('/:id', auth, reviewController.updateReview);
router.delete('/:id', auth, reviewController.deleteReview);
router.put('/:id/approve', auth, roleCheck('admin'), reviewController.approveReview);
router.get('/all', auth, roleCheck('admin'), reviewController.getAllReviews);

module.exports = router;
