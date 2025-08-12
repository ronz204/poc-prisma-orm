import { Seeder } from "@Database/Seeder";
import { LuxonHelper } from "@Helpers/LuxonHelper";
import type { PrismaClient } from "generated/prisma";
import { InvoiceFactory } from "@Database/Factories/InvoiceFactory";

export class InvoiceSeeder extends Seeder {
  constructor(prisma: PrismaClient) {
    super(prisma, "invoice-seeder");
  };

  public async seed(): Promise<void> {
    const subscriptions = await this.prisma.subscription.findMany({ include: { plan: true } });

    await Promise.all(subscriptions.flatMap(sub => {
      Array.from({ length: 2 }).map(async (_, index) => {
        const periodStart = LuxonHelper.plus(sub.startDate, index * sub.plan.period);
        const periodEnd = LuxonHelper.plus(periodStart, sub.plan.period);
        const issueDate = periodStart;
        const dueDate = LuxonHelper.plus(issueDate, 7);

        const invoice = await InvoiceFactory.build({
          subscriptionId: sub.id,
          amount: sub.plan.price,
          periodStart: periodStart,
          periodEnd: periodEnd,
          issueDate: issueDate,
          dueDate: dueDate,
        });

        await this.prisma.invoice.create({
          data: {
            subscriptionId: sub.id,
            amount: invoice.amount,
            status: invoice.status,
            issueDate: invoice.issueDate,
            dueDate: invoice.dueDate,
            periodStart: invoice.periodStart,
            periodEnd: invoice.periodEnd,
          },
        });
      });
    }));
  };
};
