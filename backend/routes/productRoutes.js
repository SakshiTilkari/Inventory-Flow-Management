const express = require('express');
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');
const { protect, authorize } = require('../middlewares/auth');

const router = express.Router();

router
  .route('/')
  .get(getProducts)
  .post(protect, authorize('staff', 'admin'), createProduct);

router
  .route('/:id')
  .get(getProduct)
  .put(protect, authorize('staff', 'admin'), updateProduct)
  .delete(protect, authorize('admin'), deleteProduct);

module.exports = router;