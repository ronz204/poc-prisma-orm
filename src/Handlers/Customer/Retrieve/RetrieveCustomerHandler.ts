import type { Handler } from "@Handlers/Handler";
import type { RetrieveCustomerQuery as Query } from "./RetrieveCustomerSchema";
import type { RetrieveCustomerResponse as Response } from "./RetrieveCustomerResponse";

import { PrismaClient } from "generated/prisma";
import { RetrieveCustomerSpec } from "./RetrieveCustomerSpec";
import { RetrieveCustomerSchema } from "./RetrieveCustomerSchema";

export class RetrieveCustomerHandler implements Handler<Query, Response> {
  constructor(private prisma: PrismaClient) { };

  public async handle(query: Query): Promise<Response> {
    const validated = RetrieveCustomerSchema.parse(query);

    const retrieveSpec = new RetrieveCustomerSpec(validated);
    const retrieved = await this.prisma.customer.findFirst(retrieveSpec.toQuery());

    if (!retrieved) throw new Error("Customer does not exist.");

    return {
      id: retrieved.id,
      name: retrieved.name,
      phone: retrieved.phone,
      country: retrieved.country,
      contracts: retrieved.contracts.map((contract) => ({
        id: contract.id,
        service: contract.service.name,
        price: contract.service.price.toNumber(),
      })),
    };
  };
};
