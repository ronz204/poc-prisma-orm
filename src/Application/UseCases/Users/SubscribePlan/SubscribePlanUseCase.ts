import type { UseCase } from "@UseCases/UseCase";
import type { SubscribePlanCommand } from "./SubscribePlanSchema";
import type { SubscribePlanResponse } from "./SubscribePlanResponse";

import { PrismaClient } from "generated/prisma";
import { SubscribePlanSchema } from "./SubscribePlanSchema";

export class SubscribePlanUseCase implements UseCase<SubscribePlanCommand, SubscribePlanResponse> {
  constructor(private readonly prisma: PrismaClient) {};

  public async execute(command: SubscribePlanCommand): Promise<SubscribePlanResponse> {
    const validated = await SubscribePlanSchema.validate(command);

    const user = await this.prisma.user.findUnique({ where: { id: validated.userId } });
    if (!user) throw new Error("User not found");

    const plan = await this.prisma.plan.findUnique({ where: { id: validated.planId } });
    if (!plan) throw new Error("Plan not found");

    await this.prisma.subscription.create({
      data: {
        userId: user.id,
        planId: plan.id,
        status: "active",
        startDate: new Date(),
        autoRenew: validated.autoRenew,
      },
    });

    return { status: "subscribed" };
  };
};
