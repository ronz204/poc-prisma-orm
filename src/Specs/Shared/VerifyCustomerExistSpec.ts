import type { Customer } from "@Models/Customer";
import { CustomerSpecification } from "@Specs/Bases/CustomerSpecification";

interface Args {
  id?: Customer.Entity["id"];
  email?: Customer.Entity["email"];
};

export class VerifyCustomerExistSpec extends CustomerSpecification {
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
