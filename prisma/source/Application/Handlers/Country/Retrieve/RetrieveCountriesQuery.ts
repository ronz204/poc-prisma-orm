import * as z from "zod";
import { RetrieveCountriesSchema } from "./RetrieveCountriesSchema";
export type RetrieveCountriesQuery = z.infer<typeof RetrieveCountriesSchema>;
