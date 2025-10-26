import { CustomerSpec } from "@Specs/Bases/CustomerSpec";
import type { RetrieveCustomerQuery } from "./RetrieveCustomerSchema";

export class RetrieveCustomerSpec extends CustomerSpec {
  constructor(private query: RetrieveCustomerQuery) {
    super();
    this.setWhere({ id: query.id });
  };

  public toQuery() {
    return {
      where: this.getWhere(),
      include: this.withServices(),
    } as const;
  };
};
