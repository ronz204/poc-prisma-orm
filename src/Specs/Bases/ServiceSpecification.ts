import type { Service } from "@Models/Service";
import { Specification } from "@Specs/Specification";

export abstract class ServiceSpecification extends Specification {
  protected where!: Service.Where;
  protected unique!: Service.Unique;

  public abstract toQuery(): object;

  public setWhere(value: Service.Where): this {
    this.where = value; return this
  };

  public setUnique(value: Service.Unique): this {
    this.unique = value; return this
  };
};
