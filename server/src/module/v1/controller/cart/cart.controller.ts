import { prisma } from '../../../../db';
import { AppError, asyncHandler } from '../../../../utils';
import { Request, Response } from 'express';

export const addToCart = asyncHandler(async (req: Request, res: Response) => {
  const { productId, quantity } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      id: req.id,
    },
  });

  if (!user) {
    throw new AppError('User not found', 404);
  }

  // get all items where productId is same and userId is same
  const item = await prisma.item.findMany({
    where: {
      productId: productId,
      userId: user.id,
    },
  });

  // get the item where orderId is null (cart Item)
  const cartItem = item.find((item) => item.orderId === null);

  // if item is not present in cart then create it
  if (!cartItem) {
    await prisma.item.create({
      data: {
        userId: user.id,
        productId,
        quantity,
      },
    });
  } else {
    // product is present in cart. update in cart
    await prisma.item.update({
      where: {
        id: cartItem.id,
      },
      data: {
        quantity: {
          increment: quantity,
        },
      },
    });
  }

  res.json({ success: true, message: 'Product added to cart successfully', item });
});

export const removeFromCart = asyncHandler(async (req: Request, res: Response) => {
  const { productId, quantity } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      id: req.id,
    },
  });

  if (!user) {
    throw new AppError('User not found', 404);
  }

  let item;
  // if quantity is 0 then delete the item from cart
  if (quantity === 0) {
    item = await prisma.item.delete({
      where: {
        id: productId,
        userId: user.id,
      },
    });
  } else {
    // if quantity is not 0 then update the quantity
    item = await prisma.item.update({
      where: {
        id: productId,
        userId: user.id,
      },
      data: {
        quantity,
      },
    });
  }
  res.json({ success: true, message: 'Product removed from cart successfully', item });
});

export const getCart = asyncHandler(async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.id,
    },
  });

  if (!user) {
    throw new AppError('User not found', 404);
  }

  // get all items where orderId is null (cart Items)
  const items = await prisma.item.findMany({
    where: {
      AND: [
        {
          userId: user.id,
        },
        {
          orderId: null,
        },
      ],
    },
    select: {
      id: true,
      product: true,
      quantity: true,
    },
  });

  res.json({
    success: true,
    message: 'User logged in successfully',
    totalItems: items.length,
    totalAmount: items.reduce((total, item) => total + item.product.price * item.quantity, 0),
    products: items.map((item) => {
      return {
        ...item.product,
        quantity: item.quantity,
        cartItemId: item.id,
      };
    }),
  });
});

export const updateQuantity = asyncHandler(async (req: Request, res: Response) => {
  const { cartItemId, quantity } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      id: req.id,
    },
  });

  if (!user) {
    throw new AppError('User not found', 404);
  }

  // check if stock is > 0
  if (quantity <= 0) {
    throw new AppError('Quantity must be greater than 0', 400);
  }

  // check if we have enough stock
  const product = await prisma.item.findUnique({
    where: {
      id: cartItemId,
    },
    select: {
      product: true,
    },
  });

  if (!product) {
    throw new AppError('Product not found', 404);
  }

  if (quantity > product.product.stock) {
    throw new AppError('Not enough stock', 400);
  }

  // update quantity
  const item = await prisma.item.update({
    where: {
      id: cartItemId,
      userId: user.id,
    },
    data: {
      quantity,
    },
  });
  res.json({ success: true, message: 'Product quantity updated successfully', item });
});
