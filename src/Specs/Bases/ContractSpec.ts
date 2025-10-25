import type { Contract } from "@Models/Contract";
import { Specification } from "@Specs/Specification";

export abstract class ContractSpec extends Specification {
  private where!: Contract.Where;
  private unique!: Contract.Unique;

  public abstract toQuery(): object;

  protected setWhere(value: Contract.Where): this {
    this.where = value; return this
  };

  protected getWhere(): Contract.Where {
    return this.where;
  };

  protected setUnique(value: Contract.Unique): this {
    this.unique = value; return this
  };

  protected getUnique(): Contract.Unique {
    return this.unique;
  };

  protected withService() {
    return { service: true };
  };

  protected withCustomer() {
    return { customer: true };
  };
};
