import { PrismaClient } from "generated/prisma";

export class UserRepository {
  constructor(private prisma: PrismaClient) {};

  public async list() {
    return this.prisma.user.findMany({});
  };

  public async find() {
    return this.prisma.user.findFirst({});
  };
};
