import type { PlayerUpdateManyArgs } from "@Prisma/models";
import { Specification } from "@Database/Specification";

interface Arguments {
  playerIds: number[];
  isFreeAgent: boolean;
};

export class UpdatePlayersFreeSpec extends Specification {
  constructor(private args: Arguments) {super()}

  public override toQuery() {
    return {
      where: {
        id: { in: this.args.playerIds }
      },
      data: {
        isFreeAgent: this.args.isFreeAgent
      }
    } as const satisfies PlayerUpdateManyArgs;
  };
};
