import * as zod from "zod";

export const DisplayServicesSchema = zod.object({
  page: zod.number().min(1).default(1),
  size: zod.number().min(1).max(20).default(10),
});

export type DisplayServicesQuery = zod.infer<typeof DisplayServicesSchema>;
