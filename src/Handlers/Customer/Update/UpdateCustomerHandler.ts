import type { Handler } from "@Handlers/Handler";
import type { UpdateCustomerCommand as Command } from "./UpdateCustomerSchema";
import type { UpdateCustomerResponse as Response } from "./UpdateCustomerResponse";

import { PrismaClient } from "generated/prisma";
import { UpdateCustomerSpec } from "./UpdateCustomerSpec";
import { UpdateCustomerSchema } from "./UpdateCustomerSchema";
import { VerifyCustomerExistSpec } from "@Specs/Shared/VerifyCustomerExistSpec";

export class UpdateCustomerHandler implements Handler<Command, Response> {
  constructor(private prisma: PrismaClient) { };

  public async handle(command: Command): Promise<Response> {
    const validated = UpdateCustomerSchema.parse(command);

    const verifySpec = new VerifyCustomerExistSpec({ id: validated.id });
    const existing = await this.prisma.customer.findFirst(verifySpec.toQuery());

    if (!existing) throw new Error("Customer does not exist.");

    const updateSpec = new UpdateCustomerSpec(validated);
    const updated = await this.prisma.customer.update(updateSpec.toQuery());

    return {
      id: updated.id,
      name: updated.name,
      phone: updated.phone,
      country: updated.country,
    };
  };
};
