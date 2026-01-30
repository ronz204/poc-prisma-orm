import type { CountryFindManyArgs } from "@Prisma/models";
import type { Specification } from "@Database/Specification";
import type { RetrieveCountriesQuery } from "./RetrieveCountriesQuery";

export class RetrieveCountriesSpec implements Specification {
  constructor(private query: RetrieveCountriesQuery) {};

  public toQuery() {
    return {
      take: this.query.limit,
      skip: this.query.offset,
      include: { players: true },
    } as const satisfies CountryFindManyArgs;
  };
};
