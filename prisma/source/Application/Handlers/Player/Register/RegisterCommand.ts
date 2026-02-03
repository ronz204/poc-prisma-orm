import * as z from "zod";
import { RegisterPlayerSchema } from "./RegisterSchema";
export type RegisterPlayerCommand = z.infer<typeof RegisterPlayerSchema>;
