import { PrismaClient, User } from '@prisma/client';
import { IUserCreate } from '../auth/auth.interface';

const prisma = new PrismaClient();

const getAllUser = async (): Promise<IUserCreate[]> => {
  const result = await prisma.user.findMany({
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

const getSingleUser = async (id: string): Promise<IUserCreate | null> => {
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
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
const updateUser = async (
  id: string,
  payload: Partial<User>
): Promise<IUserCreate | null> => {
  const result = await prisma.user.update({
    where: { id },
    data: payload,
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
const deleteUser = async (id: string): Promise<IUserCreate | null> => {
  const result = await prisma.user.delete({
    where: { id },
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
export const UserService = {
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser,
};
