import { Router } from "express";
import { addProduct, deleteProduct, getAllProducts, updateProductById } from "../controllers/product.controller.js";

export const productRoutes = Router()

productRoutes
    .get('/products',getAllProducts)
    .post('/products',addProduct)
    .put('/products/:productId',updateProductById)
    .delete('/products/:productId',deleteProduct)