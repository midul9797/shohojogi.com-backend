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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const client_1 = require("@prisma/client");
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const prisma = new client_1.PrismaClient();
const createOrder = (data, id, role) => __awaiter(void 0, void 0, void 0, function* () {
    if (role === 'admin')
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Admins are not allowed to create order');
    data.userId = id;
    const result = yield prisma.order.create({ data });
    return result;
});
const getAllOrder = (userId, role) => __awaiter(void 0, void 0, void 0, function* () {
    let result;
    if (role === 'admin') {
        result = yield prisma.order.findMany({});
    }
    else
        result = yield prisma.order.findMany({
            where: { userId },
        });
    return result;
});
const deleteOrder = (id, userId, role) => __awaiter(void 0, void 0, void 0, function* () {
    if (role === 'customer') {
        const user = yield prisma.order.findUnique({ where: { id } });
        if ((user === null || user === void 0 ? void 0 : user.userId) !== userId)
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Not Your Order');
    }
    const result = yield prisma.order.delete({
        where: { id },
    });
    return result;
});
exports.OrderService = {
    createOrder,
    getAllOrder,
    deleteOrder,
};
