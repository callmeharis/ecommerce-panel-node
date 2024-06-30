const express=require('express');
const productRouter= express.Router();
const { createProduct, updateProduct, deleteProduct, getAllProducts , getProducts} = require('../Controllers/productController');

productRouter.post('/admin/:adminId/product', createProduct);
productRouter.put('/admin/:adminId/product/:productId',updateProduct)
productRouter.delete('/admin/:adminId/product/:productId',deleteProduct)
productRouter.get('/products/all', getAllProducts);
productRouter.get('/getProducts', getProducts)


module.exports= productRouter;

