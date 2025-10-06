import { UserSpecification } from "@Specs/Bases/UserSpecification";

interface Args {
  active: boolean;
  limit: number;
  page: number;
};

export class FilterByUserStatusSpec extends UserSpecification {
  constructor(args: Args) {
    super();
    this.setTake(args.limit);
    this.setSkip(args.page * args.limit);
    this.setWhere({ active: args.active });
  };

  public toQuery() {
    return {
      take: this.take,
      skip: this.skip,
      where: this.where,
    } as const;
  };
};
