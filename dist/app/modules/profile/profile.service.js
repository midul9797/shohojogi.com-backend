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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileService = void 0;
const client_1 = require("@prisma/client");
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const prisma = new client_1.PrismaClient();
const getProfile = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.user.findUnique({
        where: { id },
        include: { address: true },
    });
    return result;
});
const updateProfile = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.user.findUnique({ where: { id } });
    if (!result)
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Wrong user id');
    const { address } = data, rest = __rest(data, ["address"]);
    if (result.addressId) {
        const add = yield prisma.address.update({
            where: { id: result.addressId },
            data: address,
        });
        if (!add)
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to update address');
        const res = yield prisma.user.update({
            where: { id },
            data: rest,
            include: { address: true },
        });
        return res;
    }
    else {
        const add = yield prisma.address.create({ data: address });
        if (!add)
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Can't create address");
        const d = Object.assign(Object.assign({}, rest), { addressId: add.id });
        const res = yield prisma.user.update({
            where: { id },
            data: d,
            include: { address: true },
        });
        return res;
    }
});
exports.ProfileService = {
    getProfile,
    updateProfile,
};
