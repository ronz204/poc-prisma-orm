import * as z from "zod";

export const CreateUserSchema = z.object({
  name: z.string().min(3).max(100),
  email: z.email().min(5).max(100),
  phone: z.string().min(10).max(15),
  country: z.string().min(2).max(50),
});

export type CreateUserCommand = z.infer<typeof CreateUserSchema>;
