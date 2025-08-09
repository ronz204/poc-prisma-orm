import { faker } from "@faker-js/faker";
import { Prisma } from "generated/prisma";
import type { Plan } from "generated/prisma";

const PLAN_PERIODS = [7, 30, 365] as const;
const PLAN_NAMES = ["Basic", "Standard", "Premium", "Annual", "Trial"];

export class PlanFactory {
  public static async build(plan: Partial<Plan>): Promise<Plan> {
    const price = plan.price ?? faker.number.float({ min: 10, max: 100 });

    return {
      id: plan.id ?? faker.number.int({ min: 1, max: 1000 }),
      name: plan.name ?? faker.helpers.arrayElement(PLAN_NAMES),
      price: new Prisma.Decimal(price),
      period: plan.period ?? faker.helpers.arrayElement(PLAN_PERIODS),
      isActive: plan.isActive ?? faker.datatype.boolean(),
      createdAt: plan.createdAt ?? new Date(),
      updatedAt: plan.updatedAt ?? new Date(),
    };
  };
};
