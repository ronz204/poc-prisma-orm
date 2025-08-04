import type { Prisma } from "generated/prisma";

export interface GetActiveSubsResponse {
  id: number;
  name: string;
  subs: {
    plan: string;
    price: Prisma.Decimal;
    status: string;
    period: number;
  }[];
};