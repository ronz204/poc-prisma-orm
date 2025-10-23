import type { Contract } from "@Models/Contract";
import { Specification } from "@Specs/Specification";

export abstract class ContractSpecification extends Specification {
  private where!: Contract.Where;
  private unique!: Contract.Unique;

  public abstract toQuery(): object;

  public setWhere(value: Contract.Where): this {
    this.where = value; return this
  };

  public getWhere(): Contract.Where {
    return this.where;
  };

  public setUnique(value: Contract.Unique): this {
    this.unique = value; return this
  };

  public getUnique(): Contract.Unique {
    return this.unique;
  };
};
