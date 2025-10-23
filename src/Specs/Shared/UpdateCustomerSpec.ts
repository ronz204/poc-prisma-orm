import type { Customer } from "@Models/Customer";
import { CustomerSpecification } from "@Specs/Bases/CustomerSpecification";

interface Args {
  id: Customer.Entity["id"];
  data: Customer.Update;
};

export class UpdateCustomerSpec extends CustomerSpecification {
  constructor(private readonly args: Args) {
    super();
    this.setUnique({ id: this.args.id });
  };

  public toQuery() {
    return {
      where: this.getUnique(),
      data: this.args.data,
    } as const;
  };
};
