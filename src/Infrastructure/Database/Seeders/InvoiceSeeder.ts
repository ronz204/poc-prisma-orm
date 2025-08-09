import { Seeder } from "@Database/Seeder";
import type { PrismaClient } from "generated/prisma";

export class InvoiceSeeder extends Seeder {
  constructor(prisma: PrismaClient) {
    super(prisma);
  };

  public async seed(): Promise<void> {
    const subscriptions = await this.prisma.subscription.findMany({
      include: { plan: true },
    });

    for (const sub of subscriptions) {
      const periodStart = new Date(sub.startDate);
      const periodEnd = new Date(periodStart);
      periodEnd.setDate(periodEnd.getDate() + sub.plan.period);

      const status = sub.id % 2 === 0 ? "paid" : "pending";

      const existing = await this.prisma.invoice.findFirst({
        where: {
          subscriptionId: sub.id,
          periodStart,
          periodEnd,
        },
        select: { id: true },
      });

      if (existing) continue;

      const issueDate = new Date(periodStart);
      const dueDate = new Date(issueDate);
      dueDate.setDate(dueDate.getDate() + 7);

      await this.prisma.invoice.create({
        data: {
          subscriptionId: sub.id,
          amount: sub.plan.price.toString(),
          periodStart: periodStart,
          periodEnd: periodEnd,
          issueDate: issueDate,
          dueDate: dueDate,
          status: status,
        },
      });
    }
  };
};
