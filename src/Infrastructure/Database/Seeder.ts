import { PrismaClient } from "generated/prisma";

export abstract class Seeder {
  constructor(protected prisma: PrismaClient) {};
  abstract seed(): Promise<void>;
};
