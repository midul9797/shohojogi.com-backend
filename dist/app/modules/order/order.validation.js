"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderValidation = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string().optional(),
        orderedBooks: zod_1.z.array(zod_1.z.object({
            bookId: zod_1.z.string({ required_error: 'Book Id is required' }),
            quantity: zod_1.z.number({ required_error: 'Quantity is required' }),
        }), { required_error: 'ordered Books is required' }),
    }),
});
exports.OrderValidation = {
    create,
};
