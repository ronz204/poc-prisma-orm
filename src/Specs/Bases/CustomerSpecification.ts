import type { Customer } from "@Models/Customer";
import { Specification } from "@Specs/Specification";

export abstract class CustomerSpecification extends Specification {
  protected where!: Customer.Where;
  protected unique!: Customer.Unique;

  public abstract toQuery(): object;

  public setWhere(value: Customer.Where): this {
    this.where = value; return this
  };

  public setUnique(value: Customer.Unique): this {
    this.unique = value; return this
  };
};
