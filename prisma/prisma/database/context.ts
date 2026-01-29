import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@Prisma/client";

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });
export const Prisma = new PrismaClient({ adapter });
