import type { MemberRole } from "@Prisma/enums";

export type RegisterTeamResponse = {
  id: number;
  tag: string;
  name: string;
  logo: string | null;
  members: {
    id: number;
    name: string;
    role: MemberRole;
    joinedAt: Date;
  }[];
};
