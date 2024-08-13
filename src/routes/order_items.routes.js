import { Router } from "express";
import { addOrderItem, deleteOrderItem, getOrderItems, updateOrderItemById } from "../controllers/order_items.controller.js";

export const orderItemsRoutes = Router()

orderItemsRoutes
    .post('/order-items',addOrderItem)
    .get('/order-items',getOrderItems)
    .get('/order-items/:orderId',getOrderItems)
    .put('/order-items/:orderItemId',updateOrderItemById)
    .delete('/order-items/:orderItemId',deleteOrderItem)