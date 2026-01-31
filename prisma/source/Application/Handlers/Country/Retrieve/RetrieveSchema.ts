import * as z from "zod";

export const RetrieveCountriesSchema = z.object({
  limit: z.number().min(1).max(100).optional(),
  offset: z.number().min(0).optional(),
  code: z.string().length(3).optional(),
});
