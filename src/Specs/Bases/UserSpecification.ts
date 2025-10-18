import type { User } from "@Models/User";
import { Specification } from "@Specs/Specification";

export abstract class UserSpecification extends Specification {
  protected where!: User.Where;
  protected unique!: User.Unique;

  public abstract toQuery(): object;

  public setWhere(value: User.Where): this {
    this.where = value; return this
  };

  public setUnique(value: User.Unique): this {
    this.unique = value; return this
  };
};
