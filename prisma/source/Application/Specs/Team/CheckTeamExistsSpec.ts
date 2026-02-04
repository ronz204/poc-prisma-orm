import type { TeamCountArgs } from "@Prisma/models";
import { Specification } from "@Database/Specification";

interface Arguments {
  tag?: string;
  name?: string;
};

export class CheckTeamExistsSpec extends Specification {
  constructor(private args: Arguments) {super()}

  public override toQuery() {
    return {
      where: {
        OR: [
          { tag: this.args.tag },
          { name: this.args.name },
        ],
      },
    } as const satisfies TeamCountArgs;
  };
};
