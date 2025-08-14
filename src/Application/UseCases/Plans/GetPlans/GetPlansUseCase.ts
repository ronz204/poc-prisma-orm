import type { PlanDTO } from "@DTOs/PlanDTO";
import type { UseCase } from "@UseCases/UseCase";
import type { GetPlansQuery } from "./GetPlansQuery";

import { PrismaClient } from "generated/prisma";
import { GetPlansSchema } from "./GetPlansSchema";
import { PaginateHelper } from "@Helpers/PaginateHelper";

export class GetPlansUseCase implements UseCase<GetPlansQuery, PlanDTO[]> {
  constructor(private readonly prisma: PrismaClient) {};

  public async execute(query: GetPlansQuery): Promise<PlanDTO[]> {
    const validated = await GetPlansSchema.validate(query);
    const pagination = PaginateHelper.paginate(query);

    const plans = await this.prisma.plan.findMany({
      take: pagination.limit,
      skip: pagination.offset,
      orderBy: { name: validated.order },
    });

    return plans.map(plan => ({
      id: plan.id,
      name: plan.name,
      price: plan.price,
      period: plan.period,
    }));
  };
};
