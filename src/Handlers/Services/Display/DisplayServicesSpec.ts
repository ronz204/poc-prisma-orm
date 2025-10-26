import { ServiceSpec } from "@Specs/Bases/ServiceSpec";
import type { DisplayServicesQuery } from "./DisplayServicesSchema";

export class DisplayServicesSpec extends ServiceSpec {
  constructor(private query: DisplayServicesQuery) {
    super();
    this.setWhere({ active: true });
    this.setPagination(query.page, query.size);
  };

  public toQuery() {
    return {
      where: this.getWhere(),
      skip: this.getSkip(),
      take: this.getTake(),
    } as const;
  };
};
