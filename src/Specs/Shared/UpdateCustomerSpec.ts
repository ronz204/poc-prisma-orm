import type { Customer } from "@Models/Customer";
import { CustomerSpec } from "@Specs/Bases/CustomerSpec";

interface Args {
  id: Customer.Entity["id"];
  data: Customer.Update;
};

export class UpdateCustomerSpec extends CustomerSpec {
  constructor(private readonly args: Args) {
    super();
    this.setUnique({ id: args.id });
  };

  public toQuery() {
    return {
      where: this.getUnique(),
      data: this.args.data,
    } as const;
  };
};
