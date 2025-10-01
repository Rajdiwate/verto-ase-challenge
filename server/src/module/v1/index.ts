import { userRouter, productRouter, cartRouter, orderRouter } from './route';
import { Router } from 'express';

const v1Routes = Router();

v1Routes.use('/user', userRouter);
v1Routes.use('/product', productRouter);
v1Routes.use('/cart', cartRouter);
v1Routes.use('/order', orderRouter);

export { v1Routes };
