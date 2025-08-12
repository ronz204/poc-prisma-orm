import { Seeder } from "@Database/Seeder";
import type { PrismaClient } from "generated/prisma";

const PLANS = [
  { name: "Trial", period: 7, price: 0.0 },
  { name: "Basic", period: 30, price: 9.99 },
  { name: "Standard", period: 30, price: 19.99 },
  { name: "Premium", period: 30, price: 29.99 },
  { name: "Annual", period: 365, price: 99.99 },
];

export class PlanSeeder extends Seeder {
  constructor(prisma: PrismaClient) {
    super(prisma, "plan-seeder");
  };

  public async seed(): Promise<void> {
    await Promise.all(PLANS.map(async (plan) => {
      await this.prisma.plan.create({
        data: {
          name: plan.name,
          price: plan.price,
          period: plan.period,
        },
      });
    }));
  };
};
