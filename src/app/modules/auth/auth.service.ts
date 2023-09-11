import { PrismaClient, User } from '@prisma/client';
import { IUserCreate } from './auth.interface';

const prisma = new PrismaClient();

const insertIntoDB = async (data: User): Promise<IUserCreate | null> => {
  const result = await prisma.user.create({ data });
  const { password, ...res } = result;
  return res;
};

export const AuthService = {
  insertIntoDB,
};
