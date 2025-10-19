import type { Handler } from "@Handlers/Handler";
import type { RegisterCustomerCommand as Command } from "./RegisterCustomerSchema";
import type { RegisterCustomerResponse as Response } from "./RegisterCustomerResponse";

import { PrismaClient } from "generated/prisma";
import { RegisterCustomerSchema } from "./RegisterCustomerSchema";
import { RegisterCustomerSpec } from "@Specs/Shared/RegisterCustomerSpec";
import { VerifyCustomerExistSpec } from "@Specs/Shared/VerifyCustomerExistSpec";

export class RegisterCustomerHandler implements Handler<Command, Response> {
  constructor(private prisma: PrismaClient) { };

  public async handle(command: Command): Promise<Response> {
    const validated = RegisterCustomerSchema.parse(command);

    const verifySpec = new VerifyCustomerExistSpec({ email: validated.email });
    const existing = await this.prisma.customer.findFirst(verifySpec.toQuery());

    if (existing) throw new Error("Customer with this email already exists.");

    const registerSpec = new RegisterCustomerSpec({ data: validated });
    const created = await this.prisma.customer.create(registerSpec.toQuery());

    return {
      id: created.id,
      name: created.name,
      phone: created.phone,
      country: created.country,
    };
  };
};
