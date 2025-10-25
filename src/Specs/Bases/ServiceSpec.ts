import type { Service } from "@Models/Service";
import { Specification } from "@Specs/Specification";

export abstract class ServiceSpec extends Specification {
  private where!: Service.Where;
  private unique!: Service.Unique;

  public abstract toQuery(): object;

  protected setWhere(value: Service.Where): this {
    this.where = value; return this
  };

  protected getWhere(): Service.Where {
    return this.where;
  };

  protected setUnique(value: Service.Unique): this {
    this.unique = value; return this
  };

  protected getUnique(): Service.Unique {
    return this.unique;
  };

  protected withContracts() {
    return { contracts: true };
  };

  protected withCustomers() {
    return { contracts: { include: { customer: true } } };
  };
};
