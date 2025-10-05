import type { User } from "@Models/User";

import { PrismaClient } from "generated/prisma";
export const Prisma = new PrismaClient();


export class Specification {
  protected skip: number = 0;
  protected take: number = 10;

  public setSkip(value: number): this {
    this.skip = value; return this
  };

  public setTake(value: number): this {
    this.take = value; return this
  };
};

export class UserSpecification extends Specification {
  protected where: User.Where = {};

  public setWhere(value: User.Where): this {
    this.where = value; return this
  };

  protected withContracts = {
    include: { contracts: true }
  };

  protected withServices = {
    include: { contracts: { include: { service: true } } }
  };

  public toQuery() {
    return {
      skip: this.skip,
      take: this.take,
      where: this.where,
    } as const;
  };
};

interface Args {
  active: boolean;
  limit: number;
  page: number
};

export class StatusUserSpec extends UserSpecification {
  constructor(args: Args) {
    super();
    this.setTake(args.limit);
    this.setSkip(args.page * args.limit);
    this.setWhere({ active: args.active });
  };

  public toQuery() {
    return {
      ...super.toQuery(),
      ...this.withServices,
    } as const;
  };
};

const spec = new StatusUserSpec({
  active: true,
  limit: 10,
  page: 0,
});

const records = await Prisma.user.findMany(spec.toQuery());
console.log(records[0]?.contracts[0]?.service.name);
