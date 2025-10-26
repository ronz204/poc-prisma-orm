import type { Handler } from "@Handlers/Handler";
import type { SuspendCustomerCommand as Command } from "./SuspendCustomerSchema";
import type { SuspendCustomerResponse as Response } from "./SuspendCustomerResponse";

import { PrismaClient } from "generated/prisma";
import { SuspendCustomerSchema } from "./SuspendCustomerSchema";
import { UpdateCustomerSpec } from "@Specs/Shared/UpdateCustomerSpec";
import { VerifyCustomerExistSpec } from "@Specs/Shared/VerifyCustomerExistSpec";

export class SuspendCustomerHandler implements Handler<Command, Response> {
  constructor(private prisma: PrismaClient) { };

  public async handle(command: Command): Promise<Response> {
    const validated = SuspendCustomerSchema.parse(command);

    const verifySpec = new VerifyCustomerExistSpec({ id: validated.id });
    const existing = await this.prisma.customer.findFirst(verifySpec.toQuery());

    if (!existing) throw new Error("Customer does not exist.");

    const updateSpec = new UpdateCustomerSpec({ id: validated.id, data: { active: false } });
    const updated = await this.prisma.customer.update(updateSpec.toQuery());

    return {
      id: updated.id,
      active: updated.active,
    };
  };
};
