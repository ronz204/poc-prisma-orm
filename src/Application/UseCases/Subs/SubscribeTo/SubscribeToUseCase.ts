import type { UseCase } from "@UseCases/UseCase";
import type { SubscribeToCommand } from "./SubscribeToCommand";
import type { SubscribeToResponse } from "./SubscribeToResponse";

import { PrismaClient } from "generated/prisma";
import { SubscribeToSchema } from "./SubscribeToSchema";

export class SubscribeToUseCase implements UseCase<SubscribeToCommand, SubscribeToResponse> {
  constructor(private readonly prisma: PrismaClient) {};

  public async execute(command: SubscribeToCommand): Promise<SubscribeToResponse> {
    const validated = await SubscribeToSchema.validate(command);

    const [client, plan] = await Promise.all([
      this.prisma.client.findFirst({
        where: { id: validated.client }
      }),
      this.prisma.plan.findFirst({
        where: { id: validated.plan }
      }),
    ]);

    if (!client) throw new Error("Client not found");
    if (!plan) throw new Error("Plan not found");

    await this.prisma.subscription.create({
      data: {
        planId: validated.plan,
        clientId: validated.client,
        autoRenew: validated.autoRenew,
      },
    });

    return { status: "success" };
  };
};
