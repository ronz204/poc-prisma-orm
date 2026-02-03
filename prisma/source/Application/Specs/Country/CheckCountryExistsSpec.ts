import type { CountryFindFirstArgs } from "@Prisma/models";
import { Specification } from "@Database/Specification";

interface Arguments {
  id?: number;
  name?: string;
  code?: string;
};

export class CheckCountryExistsSpec extends Specification {
  constructor(private args: Arguments) {super()};

  public override toQuery() {
    return {
      where: {
        OR: [{
          id: this.args.id,
          name: this.args.name,
          code: this.args.code,
        }],
      },
    } as const satisfies CountryFindFirstArgs;
  };
};
