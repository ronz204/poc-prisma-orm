import * as zod from "zod";

export const UpdateServiceSchema = zod.object({
  id: zod.number().positive().int().min(1),
  price: zod.number().positive().optional(),
  name: zod.string().min(3).max(100).optional(),
});

export type UpdateServiceCommand = zod.infer<typeof UpdateServiceSchema>;
