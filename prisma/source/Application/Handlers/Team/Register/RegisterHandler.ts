import type { Handler } from "@Handlers/Handler";
import type { RegisterTeamCommand as Command } from "./RegisterCommand";
import type { RegisterTeamResponse as Response } from "./RegisterResponse";

import { MemberRole } from "@Prisma/enums";
import { PrismaClient } from "@Prisma/client";
import { RegisterTeamSpec } from "./RegisterSpec";
import { RegisterTeamMapper } from "./RegisterMapper";
import { RegisterTeamSchema } from "./RegisterSchema";

import { CheckTeamExistsSpec } from "@Specs/Team/CheckTeamExistsSpec";
import { UpdatePlayersFreeSpec } from "@Specs/Team/UpdatePlayersFreeSpec";
import { CheckPlayerInTeamSpec } from "@Specs/Player/CheckPlayerInTeamSpec";

export class RegisterTeamHandler implements Handler<Command, Response> {
  constructor(private prisma: PrismaClient) {};

  public async handle(input: Command): Promise<Response> {
    const validated = RegisterTeamSchema.parse(input);

    const teamExists = new CheckTeamExistsSpec({ 
      tag: validated.tag, 
      name: validated.name 
    });

    const teamCount = await this.prisma.team.count(teamExists.toQuery());
    if (teamCount > 0) throw new Error("Team already exists with this tag or name");


    const captains = validated.members.filter(m => m.role === MemberRole.CAPTAIN);
    const coaches = validated.members.filter(m => m.role === MemberRole.COACH);

    if (captains.length !== 1) {
      throw new Error("Team must have exactly 1 CAPTAIN");
    }

    if (coaches.length > 1) {
      throw new Error("Team can have at most 1 COACH");
    }


    for (const member of validated.members) {
      const playerInTeam = new CheckPlayerInTeamSpec({ playerId: member.player });
      const activeTeamCount = await this.prisma.member.count(playerInTeam.toQuery());
      
      if (activeTeamCount > 0) {
        throw new Error(`Player with ID ${member.player} is already in an active team`);
      }
    }

    const query = new RegisterTeamSpec(validated).toQuery();
    const record = await this.prisma.team.create(query);

    const updatePlayers = new UpdatePlayersFreeSpec({
      playerIds: validated.members.map(m => m.player),
      isFreeAgent: false
    });

    await this.prisma.player.updateMany(updatePlayers.toQuery());
    return RegisterTeamMapper.toResponse(record);
  };
};
