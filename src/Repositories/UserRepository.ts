import type { User } from "@Models/User";
import { PrismaClient } from "generated/prisma";
import { UserSpecification } from "@Specs/UserSpecification";

export class UserRepository {
  constructor(private prisma: PrismaClient) { };

  public async list(spec: UserSpecification) {
    return await this.prisma.user.findMany(spec.toQuery());
  };

  public async create(data: User.Create) {
    return await this.prisma.user.create({ data });
  };

  public async delete(id: User.Entity["id"]) {
    return await this.prisma.user.delete({ where: { id } });
  };

  public async update(id: User.Entity["id"], data: User.Update) {
    return await this.prisma.user.update({ where: { id }, data });
  };
};
