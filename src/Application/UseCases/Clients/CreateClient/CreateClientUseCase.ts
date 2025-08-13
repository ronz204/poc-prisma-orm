import type { UseCase } from "@UseCases/UseCase";
import type { CreateClientCommand } from "./CreateClientCommand";
import type { CreateClientResponse } from "./CreateClientResponse";

import { PrismaClient } from "generated/prisma";
import { CreateClientSchema } from "./CreateClientSchema";

export class CreateClientUseCase implements UseCase<CreateClientCommand, CreateClientResponse> {
  constructor(private prisma: PrismaClient) {};

  public async execute(command: CreateClientCommand): Promise<CreateClientResponse> {
    const validated = await CreateClientSchema.validate(command);

    const existing = await this.prisma.client.findFirst({
      where: { name: validated.name, email: validated.email }
    });

    if (existing) throw new Error("Client already exists");
    const client = await this.prisma.client.create({ data: validated });

    return {
      id: client.id,
      name: client.name,
      email: client.email
    };
  };
};
