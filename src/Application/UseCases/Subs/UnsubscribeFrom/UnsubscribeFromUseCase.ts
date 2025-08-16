import type { UseCase } from "@UseCases/UseCase";
import type { UnsubscribeFromCommand } from "./UnsubscribeFromCommand";
import type { UnsubscribeFromResponse } from "./UnsubscribeFromResponse";

import { PrismaClient } from "generated/prisma";
import { UnsubscribeFromSchema } from "./UnsubscribeFromSchema";

export class UnsubscribeFromUseCase implements UseCase<UnsubscribeFromCommand, UnsubscribeFromResponse> {
  constructor(private readonly prisma: PrismaClient) {};

  public async execute(command: UnsubscribeFromCommand): Promise<UnsubscribeFromResponse> {
    const validated = await UnsubscribeFromSchema.validate(command);

    const subscription = await this.prisma.subscription.findFirst({
      where: {
        status: "active",
        id: validated.sub,
        clientId: validated.client,
      },
    });

    if (!subscription) throw new Error("Subscription not found");

    await this.prisma.subscription.update({
      where: { id: validated.sub },
      data: {
        autoRenew: false,
        status: "cancelled",
        endDate: new Date(),
      },
    });

    return { status: "success" };
  };
};
