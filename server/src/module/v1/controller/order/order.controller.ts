import { asyncHandler } from '../../../../utils';
import { prisma } from '../../../../db';
import { AppError } from '../../../../utils';
import { Request, Response } from 'express';

export const createOrder = asyncHandler(async (req: Request, res: Response) => {
  const { items }: { items: number[] } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      id: req.id,
    },
  });

  if (!user) {
    throw new AppError('User not found', 404);
  }

  // create order
  const order = await prisma.$transaction(async (tx) => {
    const newOrder = await tx.order.create({
      data: {
        userId: user.id,
        status: 'CONFIRMED',
      },
    });

    // update items with the order ID
    const updateItems = items.map((item) => tx.item.update({ where: { id: item }, data: { orderId: newOrder.id } }));
    const updatedItems = await Promise.all(updateItems);

    // reduce the stock
    const updateStock = updatedItems.map((item) => tx.product.update({ where: { id: item.productId }, data: { stock: { decrement: item.quantity } } }));
    await Promise.all(updateStock);

    return newOrder;
  });

  res.json({ success: true, message: 'Order created successfully', order });
});
