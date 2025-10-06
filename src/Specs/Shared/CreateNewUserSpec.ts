import type { User } from "@Models/User";
import { UserSpecification } from "@Specs/Bases/UserSpecification";

interface Args {
  data: User.Create;
};

export class CreateNewUserSpec extends UserSpecification {
  constructor(private args: Args) { super(); };

  public toQuery() {
    return {
      data: this.args.data,
    } as const;
  };
};
