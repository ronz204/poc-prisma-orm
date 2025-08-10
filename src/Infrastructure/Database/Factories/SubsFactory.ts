import { faker } from "@faker-js/faker";
import type { Subscription } from "generated/prisma";

const STATUSES = ["active", "cancelled", "trial"];

export class SubsFactory {
  public static async build(sub: Partial<Subscription> = {}): Promise<Subscription> {
    const status = sub.status ?? faker.helpers.arrayElement(STATUSES);
    const startDate = sub.startDate ?? faker.date.past({ years: 2 });

    const endDate = status !== "cancelled"
      ? null : faker.date.between({ from: startDate, to: new Date() });

    const createdAt = sub.createdAt ?? faker.date.between({ from: startDate, to: new Date() });
    const updatedAt = sub.updatedAt ?? faker.date.between({ from: createdAt, to: new Date() });

    return {
      id: sub.id ?? faker.number.int({ min: 1, max: 100 }),
      userId: sub.userId ?? faker.number.int({ min: 1, max: 100 }),
      planId: sub.planId ?? faker.number.int({ min: 1, max: 100 }),
      status: status,
      autoRenew: sub.autoRenew ?? faker.datatype.boolean(),
      startDate: startDate,
      endDate: endDate,
      createdAt: createdAt,
      updatedAt: updatedAt,
    };
  };
};
