import type { Customer } from "@Models/Customer";
import { CustomerSpec } from "@Specs/Bases/CustomerSpec";

interface Args {
  data: Customer.Create;
};

export class RegisterCustomerSpec extends CustomerSpec {
  constructor(private readonly args: Args) { super() };

  public toQuery() {
    return {
      data: this.args.data,
    } as const;
  };
};
