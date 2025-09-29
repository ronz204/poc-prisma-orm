import { PrismaClient } from "generated/prisma";
import { UserRepository } from "@Repos/UserRepository";

export class Unit {
  public user: UserRepository;

  constructor(prisma: PrismaClient) {
    this.user = new UserRepository(prisma);
  };
};
