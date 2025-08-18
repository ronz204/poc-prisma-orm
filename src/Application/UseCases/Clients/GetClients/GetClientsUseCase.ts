import type { UseCase } from "@UseCases/UseCase";
import type { ClientDTO } from "@DTOs/ClientDTO";
import type { GetClientsQuery } from "./GetClientsQuery";

import { PrismaClient } from "generated/prisma";
import { GetClientsSchema } from "./GetClientsSchema";
import { PaginateHelper } from "@Helpers/PaginateHelper";

export class GetClientsUseCase implements UseCase<GetClientsQuery, ClientDTO[]> {
  constructor(private readonly prisma: PrismaClient) { };

  public async execute(query: GetClientsQuery): Promise<ClientDTO[]> {
    const validated = await GetClientsSchema.validate(query);
    const pagination = PaginateHelper.paginate(query);

    const clients = await this.prisma.client.findMany({
      take: pagination.limit,
      skip: pagination.offset,
      orderBy: { name: validated.order },
      include: { subscription: { include: { plan: true } } },
    });

    return clients.map(client => ({
      id: client.id,
      name: client.name,
      email: client.email,
      sub: client.subscription
        ? {
          status: client.subscription.status,
          plan: client.subscription.plan.name,
          price: client.subscription.plan.price,
          period: client.subscription.plan.period,
        }
        : null
    }));
  };
};
