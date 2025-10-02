import { UserSpecification } from "./UserSpecification";

interface Args {
  active: boolean;
  limit: number;
  page: number;
};

export class StatusUserSpec extends UserSpecification {
  constructor(args: Args) {
    super();
    this.setTake(args.limit);
    this.setSkip(args.page * args.limit);
    this.setWhere({ active: args.active });
  };
};
