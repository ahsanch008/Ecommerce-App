const Review = require('../models/Review');
const Product = require('../models/Product');

exports.createReview = async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;
    const review = new Review({
      user: req.user._id,
      product: productId,
      rating,
      comment
    });
    await review.save();

    // Update product ratings
    const product = await Product.findById(productId);
    product.ratings.push({ user: req.user._id, rating });
    await product.save();

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: 'Error creating review', error: error.message });
  }
};

exports.getProductReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ product: req.params.productId, isApproved: true })
      .populate('user', 'name')
      .sort('-createdAt');
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reviews', error: error.message });
  }
};

exports.updateReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const review = await Review.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { rating, comment },
      { new: true }
    );
    if (!review) {
      return res.status(404).json({ message: 'Review not found or you are not authorized to update it' });
    }
    res.json(review);
  } catch (error) {
    res.status(500).json({ message: 'Error updating review', error: error.message });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!review) {
      return res.status(404).json({ message: 'Review not found or you are not authorized to delete it' });
    }

    // Update product ratings
    const product = await Product.findById(review.product);
    product.ratings = product.ratings.filter(rating => rating.user.toString() !== req.user._id.toString());
    await product.save();

    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting review', error: error.message });
  }
};

exports.approveReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { isApproved: true },
      { new: true }
    );
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.json(review);
  } catch (error) {
    res.status(500).json({ message: 'Error approving review', error: error.message });
  }
};

exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate('user', 'name')
      .populate('product', 'name')
      .sort('-createdAt');
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching all reviews', error: error.message });
  }
};