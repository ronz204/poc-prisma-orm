import { Seeder } from "@Database/Seeder";
import type { PrismaClient } from "generated/prisma";
import { PlanFactory } from "@Database/Factories/PlanFactory";

export class PlanSeeder extends Seeder {
  constructor(prisma: PrismaClient) {
    super(prisma);
  };

  public async seed(): Promise<void> {
    const plans = ["Basic", "Standard", "Premium", "Annual", "Trial"];

    await Promise.all(plans.map(async (name) => {
      const plan = await PlanFactory.build({ name });
      await this.prisma.plan.upsert({
        where: { name: plan.name },
        update: {},
        create: {
          name: plan.name,
          price: plan.price,
          period: plan.period,
        },
      });
    }));
  };
};
