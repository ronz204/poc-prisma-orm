import type { User } from "@Models/User";
import { UserSpecification } from "@Specs/Bases/UserSpecification";

interface Args {
  id: number;
  data: User.Update;
};

export class UpdateUserDataSpec extends UserSpecification {
  constructor(private args: Args) {
    super();
    this.setUnique({ id: args.id });
  };

  public toQuery() {
    return {
      where: this.unique,
      data: this.args.data,
    } as const;
  };
};
