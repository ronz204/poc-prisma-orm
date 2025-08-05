import type { Prisma } from "generated/prisma";

export interface PlanDTO {
  id: number;
  name: string;
  price: Prisma.Decimal;
  period: number;
};
