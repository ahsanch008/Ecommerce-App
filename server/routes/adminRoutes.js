const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const {authenticated,authorization} = require('../middleware/authorization');

router.get('/dashboard-stats', authenticated, authorization('admin'), adminController.getDashboardStats);

module.exports = router;