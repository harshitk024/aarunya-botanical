import prisma from "../../config/prisma.js";
import { Response } from "express";
import { AuthRequest } from "../../middlewares/auth.middleware.js";

export const checkout = async (req: any, res: Response) => {
  const userId = req.user!.userId;

  const cartItems = await prisma.cartItem.findMany({
    where: { userId },
    include: { product: true },
  });

  if (cartItems.length === 0) {
    return res.status(400).json({ message: "Cart is empty" });
  }

  let total = 0;

  for (const item of cartItems) {
    if (item.product.stock < item.quantity) {
      return res
        .status(400)
        .json({ message: `Not enough stock for ${item.product.name}` });
    }

    total += item.quantity * item.product.price;
  }

  const order = await prisma.$transaction(async (tx) => {
    const createdOrder = await tx.order.create({
      data: {
        userId,
        total,
        items: {
          create: cartItems.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.product.price,
          })),
        },
      },
    });

    for (const item of cartItems) {
      await tx.product.update({
        where: { id: item.productId },
        data: { stock: { decrement: item.quantity } },
      });
    }

    await tx.cartItem.deleteMany({ where: { userId } });

    return createdOrder;
  });

  res.json(order);
};
