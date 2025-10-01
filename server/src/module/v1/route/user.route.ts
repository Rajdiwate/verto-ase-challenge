import { Router } from 'express';
import { createUser, getUser, login } from '../controller/user';
import { validate } from '../../../middleware/validate.middleware';
import { createUserSchema, loginSchema } from '../schema/user/user.schema';
import { authMiddleware } from '../../../middleware/auth.middleware';

const userRouter = Router();

userRouter.route('/signup').post(validate(createUserSchema), createUser);
userRouter.route('/login').post(validate(loginSchema), login);
userRouter.route('/me').get(authMiddleware, getUser);

export { userRouter };
