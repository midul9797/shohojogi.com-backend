import { z } from 'zod';

const update = z.object({
  body: z.object({
    first_name: z.string().optional(),
    last_name: z.string().optional(),
    email: z.string().optional(),
    password: z.string().optional(),
    contactNo: z.string().optional(),
    address: z.object({
      house: z.string().optional(),
      block: z.string().optional(),
      road: z.string().optional(),
      ward: z.string().optional(),
      zip: z.string().optional(),
      city: z.string().optional(),
    }),
    profileImg: z.string().optional(),
  }),
});

export const UserValidation = {
  update,
};
