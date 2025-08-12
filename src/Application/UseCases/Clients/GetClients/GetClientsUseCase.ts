import type { UseCase } from "@UseCases/UseCase";
import type { GetClientsQuery } from "./GetClientsQuery";
import type { GetClientsResponse } from "./GetClientsResponse";

import { PrismaClient } from "generated/prisma";
import { GetClientsSchema } from "./GetClientsSchema";

export class GetClientsUseCase implements UseCase<GetClientsQuery, GetClientsResponse[]> {
  constructor(private readonly prisma: PrismaClient) {};

  public async execute(query: GetClientsQuery): Promise<GetClientsResponse[]> {
    const validated = await GetClientsSchema.validate(query);
    const { page, limit, order } = validated;
    
    const clients = await this.prisma.client.findMany({
      take: limit,
      skip: (page - 1) * limit,
      orderBy: { name: order },
      include: {
        subscription: {
          where: { status: "active" },
          include: { plan: true },
        },
      },
    });

    return clients.map(client => ({
      id: client.id,
      name: client.name,
      email: client.email,
      subs: client.subscription.map(sub => ({
        status: sub.status,
        plan: sub.plan.name,
        price: sub.plan.price,
        period: sub.plan.period,
      }))
    }));
  };
};
