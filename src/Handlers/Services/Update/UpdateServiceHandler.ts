import type { Handler } from "@Handlers/Handler";
import type { UpdateServiceCommand as Command } from "./UpdateServiceSchema";
import type { UpdateServiceResponse as Response } from "./UpdateServiceResponse";

import { PrismaClient } from "generated/prisma";
import { UpdateServiceSpec } from "./UpdateServiceSpec";
import { UpdateServiceSchema } from "./UpdateServiceSchema";
import { VerifyServiceExistSpec } from "@Specs/Shared/VerifyServiceExistSpec";

export class UpdateServiceHandler implements Handler<Command, Response> {
  constructor(private prisma: PrismaClient) { };

  public async handle(command: Command): Promise<Response> {
    const validated = UpdateServiceSchema.parse(command);

    const verifySpec = new VerifyServiceExistSpec({ id: validated.id });
    const existing = await this.prisma.service.findFirst(verifySpec.toQuery());

    if (!existing) throw new Error("Service does not exist.");

    const updateSpec = new UpdateServiceSpec(validated);
    const updated = await this.prisma.service.update(updateSpec.toQuery());

    return {
      id: updated.id,
      name: updated.name,
      price: updated.price.toNumber(),
    };
  };
};
