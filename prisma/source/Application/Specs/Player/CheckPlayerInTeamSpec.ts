import type { MemberCountArgs } from "@Prisma/models";
import { Specification } from "@Database/Specification";

interface Arguments {
  playerId: number;
};

export class CheckPlayerInTeamSpec extends Specification {
  constructor(private args: Arguments) {super()}

  public override toQuery() {
    return {
      where: {
        playerId: this.args.playerId,
        leftAt: null, // El jugador no ha dejado el equipo
      },
    } as const satisfies MemberCountArgs;
  };
};
