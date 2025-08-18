import { Prisma } from "generated/prisma";

export interface GetInvoicesResponse {
  id: number;
  name: string;
  invoices: {
    id: number;
    status: string;
    issueDate: Date;
    dueDate: Date;
    periodStart: Date;
    periodEnd: Date;
    amount: Prisma.Decimal;
  }[];
};
