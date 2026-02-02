import * as z from "zod";
import { RetrieveSponsorsSchema } from "./RetrieveSchema";
export type RetrieveSponsorsQuery = z.infer<typeof RetrieveSponsorsSchema>;
