import { Router } from "express";
import { addCategory, deleteCategory, getAllCategories, updateCategoryById } from "../controllers/category.controller.js";


export const categoryRoutes = Router()

categoryRoutes
    .post('/categories',addCategory)
    .get('/categories',getAllCategories)
    .put('/categories/:categoryId',updateCategoryById)
    .delete('/categories/:categoryId',deleteCategory)