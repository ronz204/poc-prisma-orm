import type { Prisma } from "generated/prisma";

export interface PlanDTO {
  id: number;
  name: string;
  period: number;
  price: Prisma.Decimal;
};
