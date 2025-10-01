import { asyncHandler } from '../../../../utils';
import { prisma } from '../../../../db';
import { Request, Response } from 'express';

export const getProducts = asyncHandler(async (req: Request, res: Response) => {
  const { limit, page } = req.query;

  // can be handled more professionally
  if (limit && page) {
    // get paginated products
    const products = await prisma.product.findMany({
      take: Number(limit),
      skip: (Number(page) - 1) * Number(limit),
    });
    res.json({ success: true, message: 'Products fetched successfully', products });
  } else {
    // get all products
    const products = await prisma.product.findMany();
    res.json({ success: true, message: 'Products fetched successfully', products });
  }
});

export const createProduct = asyncHandler(async (req: Request, res: Response) => {
  const { name, stock, price, img } = req.body;

  // create product
  const product = await prisma.product.create({
    data: {
      name,
      stock,
      price,
      img,
    },
  });

  res.json({ success: true, message: 'Product created successfully', product });
});
