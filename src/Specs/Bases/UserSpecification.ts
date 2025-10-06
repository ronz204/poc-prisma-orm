import type { User } from "@Models/User";
import { Specification } from "./Specification";

export abstract class UserSpecification extends Specification {
  protected where: User.Where = {};
  public abstract toQuery(): object;

  public setWhere(value: User.Where): this {
    this.where = value; return this
  };
};
