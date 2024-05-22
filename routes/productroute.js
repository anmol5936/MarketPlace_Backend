const express = require('express');
const router = express.Router();
const { addProduct,getProduct,getProducts,deleteProduct, updateProduct } = require('../controllers/productController');
const verifyToken = require('../middleware/verifyUser');

router.post('/addproduct',verifyToken,addProduct);
router.get('/get/:id',verifyToken,getProduct)
router.get('/get',verifyToken,getProducts)
router.delete('/delete/:id',verifyToken,deleteProduct)
router.post('/update/:id',verifyToken, updateProduct)

module.exports = router;
