import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

const getProfile = async (id: string): Promise<User | null> => {
  const result = await prisma.user.findUnique({ where: { id } });
  return result;
};

export const ProfileService = {
  getProfile,
};
