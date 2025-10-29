import { ServiceSpec } from "@Specs/Bases/ServiceSpec";
import type { RegisterServiceCommand } from "./RegisterServiceSchema";

export class RegisterServiceSpec extends ServiceSpec {
  constructor(private command: RegisterServiceCommand) {
    super();
    this.setCreate({ 
      name: command.name, 
      price: command.price,
    });
  };

  public toQuery() {
    return {
      data: this.getCreate(),
    } as const;
  };
};
