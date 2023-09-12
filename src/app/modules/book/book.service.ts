import { Book, Prisma, PrismaClient } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { BookSearchFields } from './book.constants';
import { IBookFilter } from './book.interface';
const prisma = new PrismaClient();

const insertIntoDB = async (data: Book): Promise<Book | null> => {
  const result = await prisma.book.create({
    data,
    include: { category: true },
  });
  return result;
};
const getAllBook = async (
  filters: IBookFilter,
  options: IPaginationOptions
): Promise<IGenericResponse<Book[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);

  const { searchTerm, ...filterData } = filters;
  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      OR: BookSearchFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => {
        if (key === 'category') {
          return {
            categoryId: {
              equals: (filterData as any)[key],
            },
          };
        } else if (key === 'maxPrice') {
          return {
            price: {
              lte: parseFloat((filterData as any)[key]),
            },
          };
        } else {
          return {
            price: {
              gte: parseFloat((filterData as any)[key]),
            },
          };
        }
      }),
    });
  }
  const whereCondition: Prisma.BookWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};
  const result = await prisma.book.findMany({
    where: whereCondition,
    include: { category: true },
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : { price: 'asc' },
  });
  const total = await prisma.book.count();
  return {
    meta: {
      total,
      page,
      limit,
      totalPage: Math.ceil(total / limit),
    },
    data: result,
  };
};

const getSingleBook = async (id: string) => {
  const result = await prisma.book.findUnique({
    where: {
      id,
    },
    include: { category: true },
  });
  return result;
};
const getBooksByCategory = async (id: string) => {
  const result = await prisma.book.findMany({
    where: {
      categoryId: id,
    },
    include: { category: true },
  });
  return result;
};
const updateBook = async (
  id: string,
  payload: Partial<Book>
): Promise<Book | null> => {
  const result = await prisma.book.update({
    where: { id },
    data: payload,
    include: { category: true },
  });
  return result;
};
const deleteBook = async (id: string): Promise<Book | null> => {
  const result = await prisma.book.delete({
    where: { id },
    include: { category: true },
  });
  return result;
};
export const BookService = {
  insertIntoDB,
  getAllBook,
  getSingleBook,
  updateBook,
  deleteBook,
  getBooksByCategory,
};
