import { Prisma } from "generated/prisma";

export interface ClientDTO {
  id: number;
  name: string;
  email: string;
  sub: {
    plan: string;
    status: string;
    period: number;
    price: Prisma.Decimal;
  } | null;
};
