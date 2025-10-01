import { Router } from 'express';
import { createProduct, getProducts } from '../controller/product';
import { validate } from '../../../middleware/validate.middleware';
import { createProductSchema, getProductSchema } from '../schema/product/product.schema';

const productRouter = Router();

productRouter
  .route('/')
  .post(validate(createProductSchema), createProduct)
  .get(validate(getProductSchema), getProducts);

export { productRouter };
