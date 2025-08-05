import type { PlanDTO } from "@DTOs/PlanDTO";
import type { UseCase } from "@UseCases/UseCase";
import type { ListPlansQuery } from "./ListPlansSchema";

import { PrismaClient } from "generated/prisma";
import { ListPlansSchema } from "./ListPlansSchema";

export class ListPlansUseCase implements UseCase<ListPlansQuery, PlanDTO[]> {
  constructor(private readonly prisma: PrismaClient) {};

  public async execute(query: ListPlansQuery): Promise<PlanDTO[]> {
    const validated = await ListPlansSchema.validate(query);

    const plans = await this.prisma.plan.findMany({
      where: { isActive: true },
    });

    return plans.map((plan) => ({
      id: plan.id,
      name: plan.name,
      price: plan.price,
      period: plan.period,
    }));
  };
};
