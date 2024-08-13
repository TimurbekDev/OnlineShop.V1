import { Router } from "express";
import { categoryRoutes } from "./category.routes.js";
import { productRoutes } from "./product.routes.js";
import { customerRoutes } from "./customer.routes.js";
import { orderRoutes } from "./order.routes.js";
import { orderItemsRoutes } from "./order_items.routes.js";
import { contractTypeRoutes } from "./contract_type.routes.js";
import { contractRoutes } from "./contract.routes.js";
import { paymentRoutes } from "./payment.routes.js";


export const mainRoutes = Router()

mainRoutes
    .use(categoryRoutes)
    .use(productRoutes)
    .use(customerRoutes)
    .use(orderRoutes)
    .use(orderItemsRoutes)
    .use(contractTypeRoutes)
    .use(contractRoutes)
    .use(paymentRoutes)