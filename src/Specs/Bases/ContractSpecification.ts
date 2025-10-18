import type { Contract } from "@Models/Contract";
import { Specification } from "@Specs/Specification";

export abstract class ContractSpecification extends Specification {
  protected where!: Contract.Where;
  protected unique!: Contract.Unique;

  public abstract toQuery(): object;

  public setWhere(value: Contract.Where): this {
    this.where = value; return this
  };

  public setUnique(value: Contract.Unique): this {
    this.unique = value; return this
  };
};
