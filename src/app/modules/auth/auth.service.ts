import { PrismaClient, User } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { ILoginUser, IUserCreate } from './auth.interface';

import { Secret } from 'jsonwebtoken';
import config from '../../../config';

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
const loginUser = async (loginData: ILoginUser): Promise<string> => {
  const { email, password } = loginData;
  const isUserExist = await prisma.user.findFirst({
    where: { email, password },
  });
  if (!isUserExist)
    throw new ApiError(httpStatus.NOT_FOUND, 'Wrong email or password');

  const accessToken = jwtHelpers.createToken(
    { userId: isUserExist?.id, role: isUserExist?.role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return accessToken;
};
export const AuthService = {
  insertIntoDB,
  loginUser,
};
