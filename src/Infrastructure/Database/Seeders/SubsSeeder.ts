import { Seeder } from "@Database/Seeder";
import type { PrismaClient } from "generated/prisma";

export class SubsSeeder extends Seeder {
  constructor(prisma: PrismaClient) {
    super(prisma);
  }

  public async seed(): Promise<void> {
    const users = await this.prisma.user.findMany();
    const plans = await this.prisma.plan.findMany();

    const subscriptions = [
      {
        userEmail: "alice@example.com",
        planName: "Basic",
        status: "active",
        autoRenew: true,
      },
      {
        userEmail: "bob@example.com",
        planName: "Premium",
        status: "active",
        autoRenew: false,
      },
      {
        userEmail: "charlie@example.com",
        planName: "Trial",
        status: "active",
        autoRenew: false,
      },
    ];

    for (const sub of subscriptions) {
      const user = users.find(u => u.email === sub.userEmail);
      const plan = plans.find(p => p.name === sub.planName);

      if (!user || !plan) continue;
      await this.prisma.subscription.upsert({
        where: {
          userId_planId: {
            userId: user.id,
            planId: plan.id,
          },
        },
        update: {},
        create: {
          userId: user.id,
          planId: plan.id,
          status: sub.status,
          autoRenew: sub.autoRenew,
        },
      });
    };
  };
};
