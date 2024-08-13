import { Router } from "express";
import { addContract, deleteContract, getContracts, updateContract } from "../controllers/contracts.controller.js";

export const contractRoutes = Router()

contractRoutes
    .post('/contracts',addContract)
    .get('/contracts',getContracts)
    .put('/contracts/:contractId',updateContract)
    .delete('/contracts/:contractId',deleteContract)