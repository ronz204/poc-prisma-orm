import type { Handler } from "@Handlers/Handler";
import type { DisplayServicesQuery as Query } from "./DisplayServicesSchema";
import type { DisplayServicesResponse as Response } from "./DisplayServicesResponse";

import { PrismaClient } from "generated/prisma";
import { DisplayServicesSpec } from "./DisplayServicesSpec";
import { DisplayServicesSchema } from "./DisplayServicesSchema";

export class DisplayServicesHandler implements Handler<Query, Response> {
  constructor(private prisma: PrismaClient) { };

  public async handle(query: Query): Promise<Response> {
    const validated = DisplayServicesSchema.parse(query);

    const spec = new DisplayServicesSpec(validated);
    const services = await this.prisma.service.findMany(spec.toQuery());

    return services.map((service) => ({
      id: service.id,
      name: service.name,
      price: service.price.toNumber(),
    }));
  };
};
