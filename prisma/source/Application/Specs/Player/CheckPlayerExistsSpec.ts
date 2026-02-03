import type { PlayerFindFirstArgs } from "@Prisma/models";
import { Specification } from "@Database/Specification";

interface Arguments {
  id?: number;
  name?: string;
  email?: string;
};

export class CheckPlayerExistsSpec extends Specification {
  constructor(private args: Arguments) {super()}

  public override toQuery() {
    return {
      where: {
        OR: [{
          id: this.args.id,
          name: this.args.name,
          email: this.args.email,
        }],
      },
    } as const satisfies PlayerFindFirstArgs;
  };
};
