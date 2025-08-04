import type { UseCase } from "@UseCases/UseCase";
import type { GetActiveSubsQuery } from "./GetActiveSubsSchema";
import type { GetActiveSubsResponse } from "./GetActiveSubsResponse";

import { PrismaClient } from "generated/prisma";
import { GetActiveSubsSchema } from "./GetActiveSubsSchema";

export class GetActiveSubsUseCase implements UseCase<GetActiveSubsQuery, GetActiveSubsResponse> {
  constructor(private readonly prisma: PrismaClient) {};

  public async execute(query: GetActiveSubsQuery): Promise<GetActiveSubsResponse> {
    const validated = await GetActiveSubsSchema.validate(query);

    const user = await this.prisma.user.findFirst({
      where: { email: validated.email },
      include: {
        subscription: {
          where: { status: "active" },
          include: { plan: true },
        },
      }
    });

    if (!user) throw new Error("User not found");

    return {
      id: user.id,
      name: user.name,
      subs: user.subscription.map(sub => ({
        status: sub.status,
        plan: sub.plan.name,
        price: sub.plan.price,
        period: sub.plan.period,
      })),
    };
  };
};
