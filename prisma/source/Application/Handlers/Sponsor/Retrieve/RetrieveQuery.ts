import * as z from "zod";
import { RetrieveSponsorSchema } from "./RetrieveSchema";
export type RetrieveSponsorQuery = z.infer<typeof RetrieveSponsorSchema>;
