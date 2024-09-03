const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const auth = require('../middleware/authorization');
const roleCheck = require('../middleware/roleCheck');

router.post('/', productController.createProduct);
router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);
router.put('/:id',auth.authenticated,auth.authorization('admin'), productController.updateProduct);
router.delete('/:id',auth.authenticated,auth.authorization('admin'), productController.deleteProduct);
router.put('/:id/stock',auth.authenticated,auth.authorization('admin'), productController.updateProductStock);

module.exports = router;
