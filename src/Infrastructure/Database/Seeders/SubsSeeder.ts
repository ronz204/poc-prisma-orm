import { faker } from "@faker-js/faker";
import { Seeder } from "@Database/Seeder";
import type { PrismaClient } from "generated/prisma";
import { SubsFactory } from "@Database/Factories/SubsFactory";

export class SubsSeeder extends Seeder {
  constructor(prisma: PrismaClient) {
    super(prisma, "subs-seeder");
  };

  public async seed(): Promise<void> {
    const clients = await this.prisma.client.findMany();
    const plans = await this.prisma.plan.findMany();

    await Promise.all(clients.map(async (client) => {
      const plan = faker.helpers.arrayElement(plans);
      
      if (!plan) return;
      const sub = await SubsFactory.build();

      await this.prisma.subscription.create({
        data: {
          planId: plan.id,
          clientId: client.id,
          status: sub.status,
          autoRenew: sub.autoRenew,
          startDate: sub.startDate,
          endDate: sub.endDate,
        },
      });
    }));
  };
};
