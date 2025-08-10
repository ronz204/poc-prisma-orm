import { faker } from "@faker-js/faker";
import { Seeder } from "@Database/Seeder";
import type { PrismaClient } from "generated/prisma";
import { SubsFactory } from "@Database/Factories/SubsFactory";

export class SubsSeeder extends Seeder {
  constructor(prisma: PrismaClient) {
    super(prisma);
  }

  public async seed(): Promise<void> {
    const users = await this.prisma.user.findMany();
    const plans = await this.prisma.plan.findMany();

    for (let index = 0; index < 10; index++) {
      const user = faker.helpers.arrayElement(users);
      const plan = faker.helpers.arrayElement(plans);

      if (!user || !plan) continue;

      const sub = await SubsFactory.build({
        userId: user.id,
        planId: plan.id,
      });

      await this.prisma.subscription.upsert({
        where: {
          userId_planId: {
            userId: sub.userId,
            planId: sub.planId,
          },
        },
        update: {},
        create: {
          userId: sub.userId,
          planId: sub.planId,
          status: sub.status,
          autoRenew: sub.autoRenew,
          startDate: sub.startDate,
          endDate: sub.endDate,
        },
      });
    };
  };
};
