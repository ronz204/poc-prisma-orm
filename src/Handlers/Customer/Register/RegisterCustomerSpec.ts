import { CustomerSpec } from "@Specs/Bases/CustomerSpec";
import type { RegisterCustomerCommand } from "./RegisterCustomerSchema";

export class RegisterCustomerSpec extends CustomerSpec {
  constructor(private command: RegisterCustomerCommand) {
    super();
    this.setCreate({
      name: this.command.name,
      email: this.command.email,
      phone: this.command.phone,
      country: this.command.country,
    });
  };

  public toQuery() {
    return {
      data: this.getCreate(),
    } as const;
  };
};
