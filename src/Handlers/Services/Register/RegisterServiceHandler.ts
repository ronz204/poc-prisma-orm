import type { Handler } from "@Handlers/Handler";
import type { RegisterServiceCommand as Command } from "./RegisterServiceSchema";
import type { RegisterServiceResponse as Response } from "./RegisterServiceResponse";

import { PrismaClient } from "generated/prisma";
import { RegisterServiceSpec } from "./RegisterServiceSpec";
import { RegisterServiceSchema } from "./RegisterServiceSchema";
import { VerifyServiceExistSpec } from "@Specs/Shared/VerifyServiceExistSpec";

export class RegisterServiceHandler implements Handler<Command, Response> {
  constructor(private prisma: PrismaClient) { };

  public async handle(command: Command): Promise<Response> {
    const validated = RegisterServiceSchema.parse(command);

    const verifySpec = new VerifyServiceExistSpec({ name: validated.name });
    const existing = await this.prisma.service.findFirst(verifySpec.toQuery());

    if (existing) throw new Error("Service with this name already exists.");

    const registerSpec = new RegisterServiceSpec(validated);
    const registered = await this.prisma.service.create(registerSpec.toQuery());

    return {
      id: registered.id,
      name: registered.name,
      price: registered.price.toNumber(),
    };
  };
};
