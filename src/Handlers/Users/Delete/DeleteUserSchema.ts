import * as z from "zod";

export const DeleteUserSchema = z.object({
  id: z.number().int().positive().min(1),
});

export type DeleteUserCommand = z.infer<typeof DeleteUserSchema>;
