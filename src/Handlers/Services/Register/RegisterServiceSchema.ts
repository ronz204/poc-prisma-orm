import * as zod from "zod";

export const RegisterServiceSchema = zod.object({
  name: zod.string().min(3).max(100),
  price: zod.number().positive(),
});

export type RegisterServiceCommand = zod.infer<typeof RegisterServiceSchema>;
