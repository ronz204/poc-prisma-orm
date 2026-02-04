import * as z from "zod";
import { MemberRole } from "@Prisma/enums";

export const RegisterTeamSchema = z.object({
  tag: z.string().min(3).max(10),
  name: z.string().min(3).max(50),
  logo: z.string().optional(),
  members: z.array(z.object({
    player: z.number().int().positive(),
    role: z.enum(MemberRole)
  })),
});
