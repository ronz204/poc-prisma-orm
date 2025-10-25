import type { Customer } from "@Models/Customer";
import { CustomerSpec } from "@Specs/Bases/CustomerSpec";

interface Args {
  id: Customer.Entity["id"];
};

export class RetrieveCustomerSpec extends CustomerSpec {
  constructor(private readonly args: Args) {
    super();
    this.setWhere({ id: args.id });
  };

  public toQuery() {
    return {
      where: this.getWhere(),
      include: this.withServices(),
    } as const;
  };
};
