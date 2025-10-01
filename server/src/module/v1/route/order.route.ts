import { Router } from 'express';
import { validate } from '../../../middleware/validate.middleware';
import { createOrder } from '../controller/order';
import { createOrderSchema } from '../schema/order/order.schema';
import { authMiddleware } from '../../../middleware/auth.middleware';

const orderRouter = Router();

orderRouter.route('/').post(authMiddleware, validate(createOrderSchema), createOrder);

export { orderRouter };
