import type { User } from "@Models/User";
import { Specification } from "./Specification";

export class UserSpecification extends Specification {
  
  public setWhere(value: User.Where): this {
    this.where = value; return this
  };

  public toQuery() {
    return {
      skip: this.skip,
      take: this.take,
      where: this.where,
    };
  };
};
