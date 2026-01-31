import * as z from "zod";
import { RetrieveCountriesSchema } from "./RetrieveSchema";
export type RetrieveCountriesQuery = z.infer<typeof RetrieveCountriesSchema>;
