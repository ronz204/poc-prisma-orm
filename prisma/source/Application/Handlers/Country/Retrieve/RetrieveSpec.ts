import type { CountryFindManyArgs } from "@Prisma/models";
import type { RetrieveCountriesQuery } from "./RetrieveQuery";
import { Specification } from "@Database/Specs/Specification";

export class RetrieveCountriesSpec extends Specification {
  constructor(private query: RetrieveCountriesQuery) {super()};

  public override toQuery() {
    return {
      take: this.query.limit,
      skip: this.query.offset,
      include: { players: true },
      where: { code: this.query.code },
    } as const satisfies CountryFindManyArgs;
  };
};
