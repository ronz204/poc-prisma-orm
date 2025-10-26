import type { Service } from "@Models/Service";
import { ServiceSpec } from "@Specs/Bases/ServiceSpec";

interface Args {
  id?: Service.Entity["id"];
  name?: Service.Entity["name"];
};

export class VerifyServiceExistSpec extends ServiceSpec {
  constructor(private readonly args: Args) {
    super();
    this.setWhere({
      OR: [{
        id: args.id,
        name: args.name
      }]
    });
  };

  public toQuery() {
    return {
      where: this.getWhere(),
    } as const;
  };
};
