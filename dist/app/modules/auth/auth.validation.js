"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z.object({
        first_name: zod_1.z.string({
            required_error: 'First Name is required',
        }),
        last_name: zod_1.z.string({
            required_error: 'Last Name is required',
        }),
        email: zod_1.z.string({
            required_error: 'Email is required',
        }),
        password: zod_1.z.string({
            required_error: 'Password is required',
        }),
        role: zod_1.z.enum(['admin', 'customer'], {
            required_error: 'Role is required',
        }),
        contactNo: zod_1.z.string().optional(),
        address: zod_1.z
            .object({
            house: zod_1.z.string().optional(),
            block: zod_1.z.string().optional(),
            ward: zod_1.z.string().optional(),
            road: zod_1.z.string().optional(),
            zip: zod_1.z.string().optional(),
            city: zod_1.z.string().optional(),
        })
            .optional(),
        profileImg: zod_1.z.string().optional(),
    }),
});
const login = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({
            required_error: 'Email is required',
        }),
        password: zod_1.z.string({
            required_error: 'Password is required',
        }),
    }),
});
exports.AuthValidation = {
    create,
    login,
};
