const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');

router.post('/', auth, roleCheck('admin'), productController.createProduct);
router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);
router.put('/:id', auth, roleCheck('admin'), productController.updateProduct);
router.delete('/:id', auth, roleCheck('admin'), productController.deleteProduct);
router.put('/:id/stock', auth, roleCheck('admin'), productController.updateProductStock);

module.exports = router;
