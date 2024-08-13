import { Router } from "express";
import { addContractType, deleteContractType, getContractTypes, updateContractType } from "../controllers/contract_type.controller.js";

export const contractTypeRoutes = Router()

contractTypeRoutes
    .post('/contract-types',addContractType)
    .get('/contract-types',getContractTypes)
    .put('/contract-types/:contractTypeId',updateContractType)
    .delete('/contract-types/:contractTypeId',deleteContractType)