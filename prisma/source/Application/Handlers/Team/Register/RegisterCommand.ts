import * as z from "zod";
import { RegisterTeamSchema } from "./RegisterSchema";
export type RegisterTeamCommand = z.infer<typeof RegisterTeamSchema>;
