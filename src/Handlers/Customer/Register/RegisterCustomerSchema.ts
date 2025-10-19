import * as zod from "zod";

export const RegisterCustomerSchema = zod.object({
  name: zod.string().min(3).max(100),
  email: zod.email().min(5).max(100),
  phone: zod.string().min(10).max(15),
  country: zod.string().min(2).max(50),
});

export type RegisterCustomerCommand = zod.infer<typeof RegisterCustomerSchema>;
