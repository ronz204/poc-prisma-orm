import { PrismaClient } from "generated/prisma";

export abstract class Seeder {
  constructor(protected prisma: PrismaClient, public name: string) {};
  abstract seed(): Promise<void>;
};
