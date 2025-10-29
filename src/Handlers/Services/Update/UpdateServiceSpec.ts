import { ServiceSpec } from "@Specs/Bases/ServiceSpec";
import type { UpdateServiceCommand } from "./UpdateServiceSchema";

export class UpdateServiceSpec extends ServiceSpec {
  constructor(private command: UpdateServiceCommand) {
    super();
    this.setUnique({ id: command.id });
    this.setUpdate({
      name: command.name,
      price: command.price,
    });
  };

  public toQuery() {
    return {
      where: this.getUnique(),
      data: this.getUpdate(),
    } as const;
  };
};
