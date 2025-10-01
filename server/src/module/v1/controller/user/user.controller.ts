import { prisma } from '../../../../db';
import { AppError, asyncHandler, generateToken } from '../../../../utils';
import { Request, Response } from 'express';
import { createHashPassword, verifyPassword } from '../../../../utils/bcrypt';

export const createUser = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  // if user already exists
  if (existingUser) {
    throw new AppError('User already exists', 400);
  }

  // hash the password
  const hashedPassword = await createHashPassword(password);

  // create user
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  // generate auth token
  const authToken = generateToken({ id: user.id });

  res.json({ success: true, message: 'User created successfully', user, authToken });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // find user
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  // if user not found
  if (!user) {
    throw new AppError('User not found', 404);
  }

  // check password
  const isPasswordValid = await verifyPassword(password, user.password);

  if (!isPasswordValid) {
    throw new AppError('Invalid password', 401);
  }
 
  // generate token
  const authToken = generateToken({ id: user.id });

  res.json({ success: true, message: 'User logged in successfully', user, authToken });
});

export const getUser = asyncHandler(async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.id,
    },
  });

  // if user not found
  if (!user) {
    throw new AppError('User not found', 404);
  }

  res.json({ success: true, message: 'User fetched successfully', user });
});
