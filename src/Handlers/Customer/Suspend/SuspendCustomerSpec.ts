import { CustomerSpec } from "@Specs/Bases/CustomerSpec";
import type { SuspendCustomerCommand } from "./SuspendCustomerSchema";

export class SuspendCustomerSpec extends CustomerSpec {
  constructor(private command: SuspendCustomerCommand) {
    super();
    this.setUnique({ id: command.id });
    this.setUpdate({ active: false });
  };

  public toQuery() {
    return {
      where: this.getUnique(),
      data: this.getUpdate(),
    } as const;
  };
};
