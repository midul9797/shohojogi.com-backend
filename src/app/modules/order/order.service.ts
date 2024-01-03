import { Order, PrismaClient } from '@prisma/client';

import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { ICreateOrder } from './order.interface';

const prisma = new PrismaClient();
const createOrder = async (
  data: ICreateOrder,
  id: string,
  role: string
): Promise<Partial<Order> | null> => {
  if (role === 'admin')
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Admins are not allowed to create order'
    );
  data.userId = id;
  const result = await prisma.order.create({ data });

  return result;
};
const getAllOrder = async (
  userId: string,
  role: string
): Promise<Order[] | null> => {
  let result;
  if (role === 'admin') {
    result = await prisma.order.findMany({ include: { user: true } });
  } else
    result = await prisma.order.findMany({
      where: { userId },
      include: { user: true },
    });
  return result;
};
const deleteOrder = async (
  id: string,
  userId: string,
  role: string
): Promise<Order | null> => {
  if (role === 'customer') {
    const user = await prisma.order.findUnique({ where: { id } });
    if (user?.userId !== userId)
      throw new ApiError(httpStatus.BAD_REQUEST, 'Not Your Order');
  }
  const result = await prisma.order.delete({
    where: { id },
  });
  return result;
};
export const OrderService = {
  createOrder,
  getAllOrder,
  deleteOrder,
};
