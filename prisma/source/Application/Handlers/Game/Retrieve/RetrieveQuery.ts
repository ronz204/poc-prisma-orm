import * as z from "zod";
import { RetrieveGamesSchema } from "./RetrieveSchema";
export type RetrieveGamesQuery = z.infer<typeof RetrieveGamesSchema>;
