import { PrismaClient, User } from '@prisma/client';
import { IUserCreate } from './auth.interface';

const prisma = new PrismaClient();

const insertIntoDB = async (data: User): Promise<IUserCreate | null> => {
  const result = await prisma.user.create({
    data,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      contactNo: true,
      address: true,
      profileImg: true,
    },
  });

  return result;
};

export const AuthService = {
  insertIntoDB,
};
