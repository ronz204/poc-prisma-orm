import { UserSpecification } from "@Specs/Bases/UserSpecification";

interface Args {
  id: number;
};

export class FilterByUserIDSpec extends UserSpecification {
  constructor(args: Args) {
    super();
    this.setUnique({ id: args.id });
  };

  public toQuery() {
    return {
      where: this.unique,
    } as const;
  };
};
