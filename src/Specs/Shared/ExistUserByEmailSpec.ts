import { UserSpecification } from "@Specs/Bases/UserSpecification";

interface Args {
  email: string;
};

export class ExistUserByEmailSpec extends UserSpecification {
  constructor(args: Args) {
    super();
    this.setWhere({ email: args.email });
  };

  public toQuery() {
    return {
      where: this.where,
    } as const;
  };
};
