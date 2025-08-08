import { Seeder } from "@Database/Seeder";
import type { PrismaClient } from "generated/prisma";

export class PlanSeeder extends Seeder {
  constructor(prisma: PrismaClient) {
    super(prisma);
  };

  public async seed(): Promise<void> {
    const plans = [
      {
        name: "Basic",
        price: 9.99,
        period: 30,
        isActive: true,
      },
      {
        name: "Standard",
        price: 19.99,
        period: 30,
        isActive: true,
      },
      {
        name: "Premium",
        price: 29.99,
        period: 30,
        isActive: true,
      },
      {
        name: "Annual",
        price: 99.99,
        period: 365,
        isActive: true,
      },
      {
        name: "Trial",
        price: 0.0,
        period: 7,
        isActive: true,
      },
    ];

    await Promise.all(
      plans.map(plan =>
        this.prisma.plan.upsert({
          where: { name: plan.name },
          update: {},
          create: {
            name: plan.name,
            price: plan.price.toFixed(2),
            period: plan.period,
            isActive: plan.isActive,
          },
        })
      )
    );
  };
};
