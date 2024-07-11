const express=require('express');
const productRouter= express.Router();
const { createProduct, updateProduct, deleteProduct, getAllProducts , getProducts, searchCategory, filterCategory, getSingleProduct} = require('../Controllers/productController');

productRouter.post('/admin/:adminId/product', createProduct);
productRouter.put('/admin/:adminId/product/:productId',updateProduct)
productRouter.delete('/admin/:adminId/product/:productId',deleteProduct)
productRouter.get('/products/all', getAllProducts);
productRouter.get('/getProducts', getProducts)    
productRouter.get('/searchCategory',searchCategory)
productRouter.get('/filterCategory',filterCategory)
productRouter.get('/getSingleProduct/:productId',getSingleProduct)


module.exports= productRouter;  

