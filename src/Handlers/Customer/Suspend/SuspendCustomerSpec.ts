import { CustomerSpec } from "@Specs/Bases/CustomerSpec";
import type { SuspendCustomerCommand } from "./SuspendCustomerSchema";

export class SuspendCustomerSpec extends CustomerSpec {
  constructor(private command: SuspendCustomerCommand) {
    super();
    this.setUnique({ id: command.id });
  };

  public toQuery() {
    return {
      where: this.getUnique(),
      data: { active: false },
    } as const;
  };
};
