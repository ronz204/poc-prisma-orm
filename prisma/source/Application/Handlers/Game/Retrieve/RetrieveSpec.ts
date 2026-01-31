import type { GameFindManyArgs } from "@Prisma/models";
import type { RetrieveGamesQuery } from "./RetrieveQuery";
import { Specification } from "@Database/Specs/Specification";

export class RetrieveGamesSpec extends Specification {
  constructor(private query: RetrieveGamesQuery) {super()};

  public override toQuery() {
    return {
      take: this.query.limit,
      skip: this.query.offset,
      select: {
        id: true, title: true,
        genre: true, developer: true,
      },
    } as const satisfies GameFindManyArgs;
  };
};
