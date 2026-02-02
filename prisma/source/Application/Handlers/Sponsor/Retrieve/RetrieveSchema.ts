import * as z from "zod";

export const RetrieveSponsorsSchema = z.object({
  limit: z.number().min(1).max(100).optional(),
  offset: z.number().min(0).optional(),
});
