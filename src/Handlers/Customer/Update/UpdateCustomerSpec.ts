import { CustomerSpec } from "@Specs/Bases/CustomerSpec";
import type { UpdateCustomerCommand } from "./UpdateCustomerSchema";

export class UpdateCustomerSpec extends CustomerSpec {
  constructor(private command: UpdateCustomerCommand) {
    super();
    this.setUnique({ id: command.id });
  };

  public toQuery() {
    return {
      where: this.getUnique(),
      data: {
        name: this.command.name,
        email: this.command.email,
        phone: this.command.phone,
        country: this.command.country,
      },
    } as const;
  };
};
