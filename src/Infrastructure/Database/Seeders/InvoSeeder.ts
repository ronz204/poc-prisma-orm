import { Seeder } from "@Database/Seeder";
import { LuxonHelper } from "@Helpers/LuxonHelper";
import type { PrismaClient } from "generated/prisma";
import { InvoFactory } from "@Database/Factories/InvoFactory";

export class InvoSeeder extends Seeder {
  constructor(prisma: PrismaClient) {
    super(prisma);
  };

  public async seed(): Promise<void> {
    const subscriptions = await this.prisma.subscription.findMany({
      include: { plan: true }
    });

    await Promise.all(subscriptions.map(async (sub) => {
      const planPeriod = sub.plan.period;
      const startSubDate = sub.startDate;

      for (let index = 0; index < 2; index++) {
        const periodStart = LuxonHelper.plus(startSubDate, index * planPeriod);
        const periodEnd = LuxonHelper.plus(periodStart, planPeriod);

        const issueDate = periodStart;
        const dueDate = LuxonHelper.plus(issueDate, 7);

        const invoice = await InvoFactory.build({
          subscriptionId: sub.id,
          periodStart: periodStart,
          periodEnd: periodEnd,
          issueDate: issueDate,
          dueDate: dueDate,
        });

        await this.prisma.invoice.create({
          data: {
            subscriptionId: sub.id,
            amount: invoice.amount,
            issueDate: invoice.issueDate,
            dueDate: invoice.dueDate,
            status: invoice.status,
            periodStart: invoice.periodStart,
            periodEnd: invoice.periodEnd,
          },
        });
      };
    }));
  };
};
