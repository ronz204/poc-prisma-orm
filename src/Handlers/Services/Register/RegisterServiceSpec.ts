import { ServiceSpec } from "@Specs/Bases/ServiceSpec";
import type { RegisterServiceCommand } from "./RegisterServiceSchema";

export class RegisterServiceSpec extends ServiceSpec {
  constructor(private command: RegisterServiceCommand) { super() };

  public toQuery() {
    return {
      data: {
        name: this.command.name,
        price: this.command.price,
      },
    } as const;
  };
};
