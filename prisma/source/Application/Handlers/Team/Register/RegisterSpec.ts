import type { TeamCreateArgs } from "@Prisma/models";
import type { RegisterTeamCommand } from "./RegisterCommand";
import { Specification } from "@Database/Specification";

export class RegisterTeamSpec extends Specification {
  constructor(private command: RegisterTeamCommand) {super()};

  public override toQuery() {
    return {
      data: {
        tag: this.command.tag,
        name: this.command.name,
        logoUrl: this.command.logo,
        members: {
          create: this.command.members.map((member) => ({
            playerId: member.player, role: member.role
          })),
        },
      },
      select: {
        id: true, tag: true,
        name: true, logoUrl: true,
        members: {
          select: {
            role: true,
            joinedAt: true,
            player: {
              select: { id: true, name: true }
            },
          },
        },
      },
    } as const satisfies TeamCreateArgs;
  };
};
