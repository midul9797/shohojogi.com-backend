import { Order, PrismaClient } from '@prisma/client';
import { asyncForEach } from '../../../shared/asyncForEach';

import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { ICreateOrder } from './order.interface';

const prisma = new PrismaClient();
const createOrder = async (
  data: ICreateOrder,
  id: string
): Promise<Partial<Order> | null> => {
  if (id !== data.userId)
    throw new ApiError(httpStatus.BAD_REQUEST, 'Wrong User Id');
  const result = await prisma.order.create({ data: { userId: data.userId } });
  await asyncForEach(
    data.orderedBooks,
    async (orderedBook: Record<string, unknown>) => {
      await prisma.orderedBook.create({
        data: {
          orderId: result.id,
          bookId: orderedBook.bookId as string,
          quantity: orderedBook.quantity as number,
        },
      });
    }
  );
  const res = await prisma.order.findUnique({
    where: { id: result.id },
    select: {
      id: true,
      userId: true,
      orderedBooks: {
        select: {
          bookId: true,
          quantity: true,
        },
      },
    },
  });
  return res;
};
const getAllOrder = async (
  userId: string,
  role: string
): Promise<Order[] | null> => {
  let result;
  if (role === 'admin') {
    result = await prisma.order.findMany({ include: { orderedBooks: true } });
  } else
    result = await prisma.order.findMany({
      where: { userId },
      include: { orderedBooks: true },
    });
  return result;
};

const getSingleOrder = async (
  id: string,
  userId: string
): Promise<Order | null> => {
  const result = await prisma.order.findUnique({
    where: { id, userId },
    include: { orderedBooks: true },
  });
  return result;
};

export const OrderService = {
  createOrder,
  getAllOrder,
  getSingleOrder,
};
