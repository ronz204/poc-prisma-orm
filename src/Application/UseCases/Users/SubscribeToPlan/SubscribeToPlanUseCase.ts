import type { UseCase } from "@UseCases/UseCase";
import type { SubscribeToPlanCommand } from "./SubscribeToPlanSchema";
import type { SubscribeToPlanResponse } from "./SubscribeToPlanResponse";

import { PrismaClient } from "generated/prisma";
import { SubscribeToPlanSchema } from "./SubscribeToPlanSchema";

export class SubscribeToPlanUseCase implements UseCase<SubscribeToPlanCommand, SubscribeToPlanResponse> {
  constructor(private readonly prisma: PrismaClient) {};

  public async execute(command: SubscribeToPlanCommand): Promise<SubscribeToPlanResponse> {
    const validated = await SubscribeToPlanSchema.validate(command);

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
