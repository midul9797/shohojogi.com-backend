import { z } from 'zod';

const create = z.object({
  body: z.object({
    userId: z.string().optional(),
    delivery_time: z.string(),
    service: z.string(),
    contact: z.string(),
    address: z.string(),
    order_details: z.string(),
    subtotal: z.number(),
    delivery_fee: z.number(),
    total_amount: z.number(),
    note: z.string(),
  }),
});

export const OrderValidation = {
  create,
};
