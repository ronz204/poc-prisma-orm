import { PrismaClient } from "generated/prisma";

export class UserRepository {
  constructor(private prisma: PrismaClient) { };

  public async list() {
    return await this.prisma.user.findMany();
  };
};
