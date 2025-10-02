import { PrismaClient } from "generated/prisma";
import { UserSpecification } from "@Specs/UserSpecification";

export class UserRepository {
  constructor(private prisma: PrismaClient) { };

  public async list(spec: UserSpecification) {
    return await this.prisma.user.findMany(spec.toQuery());
  };
};
