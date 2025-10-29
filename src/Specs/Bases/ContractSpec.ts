import type { Contract } from "@Models/Contract";
import { Specification } from "@Specs/Specification";

export abstract class ContractSpec extends Specification {
  private where!: Contract.Where;
  private unique!: Contract.Unique;

  private update!: Contract.Update;
  private create!: Contract.Create;

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

  protected setUpdate(value: Contract.Update): this {
    this.update = value; return this
  };

  protected getUpdate(): Contract.Update {
    return this.update;
  };

  protected setCreate(value: Contract.Create): this {
    this.create = value; return this
  };

  protected getCreate(): Contract.Create {
    return this.create;
  };

  protected withService() {
    return { service: true };
  };

  protected withCustomer() {
    return { customer: true };
  };
};
