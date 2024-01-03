"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const update = zod_1.z.object({
    body: zod_1.z.object({
        first_name: zod_1.z.string().optional(),
        last_name: zod_1.z.string().optional(),
        email: zod_1.z.string().optional(),
        password: zod_1.z.string().optional(),
        contactNo: zod_1.z.string().optional(),
        address: zod_1.z.object({
            house: zod_1.z.string().optional(),
            block: zod_1.z.string().optional(),
            road: zod_1.z.string().optional(),
            ward: zod_1.z.string().optional(),
            zip: zod_1.z.string().optional(),
            city: zod_1.z.string().optional(),
        }),
        profileImg: zod_1.z.string().optional(),
    }),
});
exports.UserValidation = {
    update,
};
