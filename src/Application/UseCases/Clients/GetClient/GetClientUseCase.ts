import type { UseCase } from "@UseCases/UseCase";
import type { ClientDTO } from "@DTOs/ClientDTO";
import type { GetClientQuery } from "./GetClientQuery";

import { PrismaClient } from "generated/prisma";
import { GetClientSchema } from "./GetClientSchema";

export class GetClientUseCase implements UseCase<GetClientQuery, ClientDTO> {
  constructor(private readonly prisma: PrismaClient) {};

  async execute(query: GetClientQuery): Promise<ClientDTO> {
    const validated = await GetClientSchema.validate(query);

    const client = await this.prisma.client.findUnique({
      where: { id: validated.id },
      include: { subscription: { include: { plan: true } } },
    });

    if (!client) throw new Error("Client not found");

    return {
      id: client.id,
      name: client.name,
      email: client.email,
      subs: client.subscription.map(sub => ({
        status: sub.status,
        plan: sub.plan.name,
        price: sub.plan.price,
        period: sub.plan.period,
      })),
    };
  };
};
