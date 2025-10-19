import type { Customer } from "@Models/Customer";
import { CustomerSpecification } from "@Specs/Bases/CustomerSpecification";

interface Args {
  data: Customer.Create;
};

export class RegisterCustomerSpec extends CustomerSpecification {
  constructor(private readonly args: Args) { super() };

  public toQuery() {
    return {
      data: this.args.data,
    } as const;
  };
};
