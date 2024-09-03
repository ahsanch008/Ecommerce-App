const Product = require('../models/Product');
const User = require('../models/User');
const Order = require('../models/Order');
const Review = require('../models/Review');

exports.getDashboardStats = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalUsers = await User.countDocuments();
    const totalOrders = await Order.countDocuments();
    const pendingReviews = await Review.countDocuments({ isApproved: false });

    res.json({
      totalProducts,
      totalUsers,
      totalOrders,
      pendingReviews,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching dashboard stats', error: error.message });
  }
};