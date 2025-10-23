import type { Service } from "@Models/Service";
import { Specification } from "@Specs/Specification";

export abstract class ServiceSpecification extends Specification {
  private where!: Service.Where;
  private unique!: Service.Unique;

  public abstract toQuery(): object;

  public setWhere(value: Service.Where): this {
    this.where = value; return this
  };

  public getWhere(): Service.Where {
    return this.where;
  };

  public setUnique(value: Service.Unique): this {
    this.unique = value; return this
  };

  public getUnique(): Service.Unique {
    return this.unique;
  };
};
