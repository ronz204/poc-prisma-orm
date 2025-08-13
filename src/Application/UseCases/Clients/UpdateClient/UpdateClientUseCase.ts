import type { UseCase } from "@UseCases/UseCase";
import type { UpdateClientCommand } from "./UpdateClientCommand";
import type { UpdateClientResponse } from "./UpdateClientResponse";

import { PrismaClient } from "generated/prisma";
import { UpdateClientSchema } from "./UpdateClientSchema";

export class UpdateClientUseCase implements UseCase<UpdateClientCommand, UpdateClientResponse> {
  constructor(private readonly prisma: PrismaClient) {};

  public async execute(command: UpdateClientCommand): Promise<UpdateClientResponse> {
    const validated = await UpdateClientSchema.validate(command);

    const existing = await this.prisma.client.findUnique({
      where: { id: validated.id }
    });

    if (!existing) throw new Error("Client not found");

    const client = await this.prisma.client.update({
      where: { id: validated.id }, data: validated
    });

    return {
      id: client.id,
      name: client.name,
      email: client.email
    };
  };
};
