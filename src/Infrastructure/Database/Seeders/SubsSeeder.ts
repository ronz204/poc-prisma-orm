import { faker } from "@faker-js/faker";
import { Seeder } from "@Database/Seeder";
import type { PrismaClient } from "generated/prisma";
import { SubsFactory } from "@Database/Factories/SubsFactory";

export class SubsSeeder extends Seeder {
  constructor(prisma: PrismaClient) {
    super(prisma);
  };

  public async seed(): Promise<void> {
    const users = await this.prisma.user.findMany();
    const plans = await this.prisma.plan.findMany();

    const subs = await SubsFactory.bulk(10);

    await Promise.all(subs.map(async (sub) => {
      const user = faker.helpers.arrayElement(users);
      const plan = faker.helpers.arrayElement(plans);

      if (!user || !plan) return;

      await this.prisma.subscription.create({
        data: {
          userId: user.id,
          planId: plan.id,
          status: sub.status,
          autoRenew: sub.autoRenew,
          startDate: sub.startDate,
          endDate: sub.endDate,
        },
      });
    }));
  };
};
