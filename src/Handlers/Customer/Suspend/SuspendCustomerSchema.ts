import * as zod from "zod";

export const SuspendCustomerSchema = zod.object({
  id: zod.number().positive().int().min(1),
  reason: zod.string().min(5).max(255).optional(),
});

export type SuspendCustomerCommand = zod.infer<typeof SuspendCustomerSchema>;
