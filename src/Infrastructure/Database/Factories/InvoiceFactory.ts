import { faker } from "@faker-js/faker";
import { Prisma } from "generated/prisma";
import type { Invoice } from "generated/prisma";

const STATUSES = ["pending", "paid", "overdue"];

export class InvoiceFactory {
  public static async build(invo: Partial<Invoice>): Promise<Invoice> {
    const periodStart = invo.periodStart ?? faker.date.past({ years: 1 });
    const periodEnd = invo.periodEnd ?? faker.date.soon({ days: 30, refDate: periodStart });

    const issueDate = invo.issueDate ?? faker.date.between({ from: periodStart, to: periodEnd });
    const dueDate = invo.dueDate ?? faker.date.soon({ days: 7, refDate: issueDate });

    return {
      id: invo.id ?? faker.number.int({ min: 1, max: 100 }),
      subscriptionId: invo.subscriptionId ?? faker.number.int({ min: 1, max: 100 }),
      amount: new Prisma.Decimal(invo.amount ?? 0),
      status: invo.status ?? faker.helpers.arrayElement(STATUSES),
      periodStart: invo.periodStart ?? periodStart,
      periodEnd: invo.periodEnd ?? periodEnd,
      issueDate: invo.issueDate ?? issueDate,
      dueDate: invo.dueDate ?? dueDate,
      createdAt: invo.createdAt ?? issueDate,
      updatedAt: invo.updatedAt ?? dueDate,
    };
  };
};
