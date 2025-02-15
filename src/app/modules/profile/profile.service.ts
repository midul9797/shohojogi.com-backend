import { PrismaClient, User } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';

const prisma = new PrismaClient();

const getProfile = async (id: string): Promise<User | null> => {
  const result = await prisma.user.findUnique({
    where: { id },
    include: { address: true },
  });
  return result;
};
const makeAdmin = async (payload: {
  email: string;
}): Promise<{ count: number }> => {
  const result = await prisma.user.updateMany({
    where: { email: payload.email },
    data: { role: 'admin' },
  });
  if (result) return result;
  else throw new ApiError(httpStatus.BAD_REQUEST, 'Failed');
};
const updateProfile = async (
  id: string,

  data: any
): Promise<User | null> => {
  const result = await prisma.user.findUnique({ where: { id } });
  if (!result) throw new ApiError(httpStatus.BAD_REQUEST, 'Wrong user id');
  const { address, ...rest } = data;
  if (address) {
    if (result.addressId) {
      const add = await prisma.address.update({
        where: { id: result.addressId },
        data: address,
      });
      if (!add)
        throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to update address');
      const res = await prisma.user.update({
        where: { id },
        data: rest,
        include: { address: true },
      });
      return res;
    } else {
      const add = await prisma.address.create({ data: address });
      if (!add)
        throw new ApiError(httpStatus.BAD_REQUEST, "Can't create address");
      const d = { ...rest, addressId: add.id };
      const res = await prisma.user.update({
        where: { id },
        data: d,
        include: { address: true },
      });
      return res;
    }
  } else {
    const res = await prisma.user.update({
      where: { id },
      data: rest,
      include: { address: true },
    });
    return res;
  }
};

export const ProfileService = {
  getProfile,
  updateProfile,
  makeAdmin,
};
