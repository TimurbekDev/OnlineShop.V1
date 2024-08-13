import { Router } from "express";
import { addPayment, deletePayment, getPayments, updatePayment } from "../controllers/payment.controller.js";

export const paymentRoutes = Router()

paymentRoutes
    .post('/payments',addPayment)
    .get('/payments/:customerId',getPayments)
    .get('/payments',getPayments)
    .put('/payments/:customerId',updatePayment)
    .delete('/payments/:customerId',deletePayment)