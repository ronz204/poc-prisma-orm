import { RegisterTeamSpec } from "./RegisterSpec";
import type { TeamGetPayload } from "@Prisma/models";
import type { RegisterTeamResponse } from "./RegisterResponse";

type query = ReturnType<RegisterTeamSpec["toQuery"]>;
type payload = TeamGetPayload<query>;

export class RegisterTeamMapper {
  public static toResponse(payload: payload): RegisterTeamResponse {
    return {
      id: payload.id,
      tag: payload.tag,
      name: payload.name,
      logo: payload.logoUrl,
      
      members: payload.members.map((member) => ({
        id: member.player.id,
        name: member.player.name,
        role: member.role,
        joinedAt: member.joinedAt,
      })),
    };
  };
};
