import type { Customer } from "@Models/Customer";
import { CustomerSpec } from "@Specs/Bases/CustomerSpec";

interface Args {
  id?: Customer.Entity["id"];
  email?: Customer.Entity["email"];
};

export class VerifyCustomerExistSpec extends CustomerSpec {
  constructor(private readonly args: Args) {
    super();
    this.setWhere({
      OR: [{
        id: args.id,
        email: args.email
      }]
    });
  };

  public toQuery() {
    return {
      where: this.getWhere(),
    } as const;
  };
};
