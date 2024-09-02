const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const auth = require('../middleware/authorization');
const roleCheck = require('../middleware/roleCheck');

router.post('/',auth.authenticated, reviewController.createReview);
router.get('/product/:productId',auth.authenticated, reviewController.getProductReviews);
router.put('/:id', auth.authenticated, reviewController.updateReview);
router.delete('/:id', auth.authenticated, reviewController.deleteReview);
router.put('/:id/approve', reviewController.approveReview);
router.get('/all', reviewController.getAllReviews);

module.exports = router;
