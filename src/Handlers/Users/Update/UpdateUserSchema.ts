import * as z from "zod";

export const UpdateUserSchema = z.object({
  id: z.number().int().positive().min(1),
  name: z.string().min(3).max(100).optional(),
  phone: z.string().min(10).max(15).optional(),
  country: z.string().min(2).max(50).optional(),
});

export type UpdateUserCommand = z.infer<typeof UpdateUserSchema>;
