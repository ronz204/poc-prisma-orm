import type { SponsorFindManyArgs } from "@Prisma/models";
import type { RetrieveSponsorsQuery } from "./RetrieveQuery";
import { Specification } from "@Database/Specification";

export class RetrieveSponsorsSpec extends Specification {
  constructor(private query: RetrieveSponsorsQuery) {super()};

  public override toQuery() {
    return {
      take: this.query.limit,
      skip: this.query.offset,
      select: {
        id: true, name: true,
        logoUrl: true, websiteUrl: true
      },
    } as const satisfies SponsorFindManyArgs;
  };
};
