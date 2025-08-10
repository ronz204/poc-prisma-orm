import { faker } from "@faker-js/faker";
import { Prisma } from "generated/prisma";
import type { Plan } from "generated/prisma";

const DEFINITIONS = [
  { name: "Trial", period: 7, price: 0.0 },
  { name: "Basic", period: 30, price: 9.99 },
  { name: "Standard", period: 30, price: 19.99 },
  { name: "Premium", period: 30, price: 29.99 },
  { name: "Annual", period: 365, price: 99.99 },
];

export class PlanFactory {
  public static async build(plan: Partial<Plan>) {
    const definition = DEFINITIONS.find(p => p.name === plan.name)!;

    return {
      id: plan.id ?? faker.number.int({ min: 1, max: 100 }),
      name: definition.name,
      period: definition.period,
      price: new Prisma.Decimal(definition.price),
      isActive: plan.isActive ?? faker.datatype.boolean(),
      createdAt: plan.createdAt ?? new Date(),
      updatedAt: plan.updatedAt ?? new Date(),
    };
  };

  public static async bulk(count: number, plan: Partial<Plan>): Promise<Plan[]> {
    return Promise.all(Array.from({ length: count }).map(() => this.build(plan)));
  };
};
