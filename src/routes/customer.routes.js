import { Router } from "express";
import { addCustomer, deleteCustomer, getAllCustomers, updateCustomerById } from "../controllers/customers.controller.js";

export const customerRoutes = Router()

customerRoutes
    .post('/customers',addCustomer)
    .get('/customers',getAllCustomers)
    .put('/customers/:customerId',updateCustomerById)
    .delete('/customers/:customerId',deleteCustomer)