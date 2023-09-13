"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const client_1 = require("@prisma/client");
const asyncForEach_1 = require("../../../shared/asyncForEach");
const prisma = new client_1.PrismaClient();
const createOrder = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.order.create({ data: { userId: data.userId } });
    yield (0, asyncForEach_1.asyncForEach)(data.orderedBooks, (orderedBook) => __awaiter(void 0, void 0, void 0, function* () {
        yield prisma.orderedBook.create({
            data: {
                orderId: result.id,
                bookId: orderedBook.bookId,
                quantity: orderedBook.quantity,
            },
        });
    }));
    const res = yield prisma.order.findUnique({
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
});
const getAllOrder = (userId, role) => __awaiter(void 0, void 0, void 0, function* () {
    let result;
    if (role === 'admin') {
        result = yield prisma.order.findMany({ include: { orderedBooks: true } });
    }
    else
        result = yield prisma.order.findMany({
            where: { userId },
            include: { orderedBooks: true },
        });
    return result;
});
const getSingleOrder = (id, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.order.findUnique({
        where: { id, userId },
        include: { orderedBooks: true },
    });
    return result;
});
exports.OrderService = {
    createOrder,
    getAllOrder,
    getSingleOrder,
};
