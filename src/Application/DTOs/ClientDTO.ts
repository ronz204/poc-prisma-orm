import { Prisma } from "generated/prisma";

export interface ClientDTO {
  id: number;
  name: string;
  email: string;
  subs: {
    plan: string;
    status: string;
    period: number;
    price: Prisma.Decimal;
  }[];
};
