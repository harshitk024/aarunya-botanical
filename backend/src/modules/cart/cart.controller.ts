import { Response } from "express";
import prisma from "../../config/prisma";
import { AuthRequest } from "../../middlewares/auth.middleware";

export const addToCart = async (req: any, res: Response) => {
  const { productId, quantity } = req.body;
  const userId = req.user!.userId;

  const item = await prisma.cartItem.upsert({
    where: {
      userId_productId: { userId, productId },
    },
    update: {
      quantity: { increment: quantity },
    },
    create: {
      userId,
      productId,
      quantity,
    },
  });

  res.json(item);
};

export const getCart = async (req: any, res: Response) => {
  const userId = req.user!.userId;

  const cart = await prisma.cartItem.findMany({
    where: { userId },
    include: { product: true },
  });

  res.json(cart);
};

export const removeFromCart = async (req: any, res: Response) => {
  const { productId } = req.params;
  const userId = req.user!.userId;

  await prisma.cartItem.delete({
    where: {
      userId_productId: { userId, productId },
    },
  });

  res.json({ message: "Item removed" });
};
