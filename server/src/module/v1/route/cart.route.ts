import { Router } from 'express';
import { validate } from '../../../middleware/validate.middleware';
import { authMiddleware } from '../../../middleware/auth.middleware';
import { addToCart, getCart, removeFromCart, updateQuantity } from '../controller/cart/';
import { addCartSchema, removeCartSchema, updateQuantitySchema } from '../schema/cart/cart.schema';

const cartRouter = Router();

cartRouter
  .route('/')
  .post(authMiddleware, validate(addCartSchema), addToCart)
  .patch(authMiddleware, validate(updateQuantitySchema), updateQuantity)
  .get(authMiddleware, getCart);
cartRouter.route('/remove').post(authMiddleware, validate(removeCartSchema), removeFromCart);

export { cartRouter };
