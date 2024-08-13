import { Router } from "express";
import { addOrder, deleteOrder, getOrders, updateOrderById } from "../controllers/order.controller.js";

export const orderRoutes = Router()

orderRoutes
    .post('/orders',addOrder)
    .get('/orders/:customerId',getOrders)
    .get('/orders',getOrders)
    .put('/orders/:orderId',updateOrderById)
    .delete('/orders/:orderId',deleteOrder)