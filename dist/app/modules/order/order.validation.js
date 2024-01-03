"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderValidation = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string().optional(),
        delivery_time: zod_1.z.string(),
        service: zod_1.z.string(),
        contact: zod_1.z.string(),
        address: zod_1.z.string(),
        order_details: zod_1.z.string(),
        subtotal: zod_1.z.number(),
        delivery_fee: zod_1.z.number(),
        total_amount: zod_1.z.number(),
        note: zod_1.z.string(),
    }),
});
exports.OrderValidation = {
    create,
};
