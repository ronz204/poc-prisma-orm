import type { Customer } from "@Models/Customer";
import { Specification } from "@Specs/Specification";

export abstract class CustomerSpec extends Specification {
  private where!: Customer.Where;
  private unique!: Customer.Unique;

  public abstract toQuery(): object;

  protected setWhere(value: Customer.Where): this {
    this.where = value; return this
  };

  protected getWhere(): Customer.Where {
    return this.where;
  };

  protected setUnique(value: Customer.Unique): this {
    this.unique = value; return this
  };

  protected getUnique(): Customer.Unique {
    return this.unique;
  };

  protected withContracts() {
    return { contracts: true };
  };

  protected withServices() {
    return { contracts: { include: { service: true } } };
  };
};
