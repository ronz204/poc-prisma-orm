import type { Customer } from "@Models/Customer";
import { Specification } from "@Specs/Specification";

export abstract class CustomerSpecification extends Specification {
  private where!: Customer.Where;
  private unique!: Customer.Unique;

  public abstract toQuery(): object;

  public setWhere(value: Customer.Where): this {
    this.where = value; return this
  };

  public getWhere(): Customer.Where {
    return this.where;
  };

  public setUnique(value: Customer.Unique): this {
    this.unique = value; return this
  };

  public getUnique(): Customer.Unique {
    return this.unique;
  };
};
