import { Prisma } from "generated/prisma";

export interface GetClientsResponse {
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
