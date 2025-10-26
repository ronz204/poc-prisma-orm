import * as zod from "zod";

export const UpdateCustomerSchema = zod.object({
  id: zod.number().positive().int().min(1),
  name: zod.string().min(3).max(100).optional(),
  email: zod.email().min(5).max(100).optional(),
  phone: zod.string().min(10).max(15).optional(),
  country: zod.string().min(2).max(50).optional(),
});

export type UpdateCustomerCommand = zod.infer<typeof UpdateCustomerSchema>;
