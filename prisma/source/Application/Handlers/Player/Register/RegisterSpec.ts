import type { PlayerCreateArgs } from "@Prisma/models";
import type { RegisterPlayerCommand } from "./RegisterCommand";
import { Specification } from "@Database/Specification";

export class RegisterPlayerSpec extends Specification {
  constructor(private command: RegisterPlayerCommand) {super()};

  public override toQuery() {
    return {
      data: {
        name: this.command.name,
        email: this.command.email,
        countryId: this.command.country,
      },
      select: {
        id: true, name: true,
        status: true, isFreeAgent: true,
        country: { select: { name: true } }
      },
    } as const satisfies PlayerCreateArgs;
  };
};
