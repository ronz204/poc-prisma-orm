import * as zod from "zod";

export const RetrieveCustomerSchema = zod.object({
  id: zod.number().positive().int().min(1),
});

export type RetrieveCustomerQuery = zod.infer<typeof RetrieveCustomerSchema>;
