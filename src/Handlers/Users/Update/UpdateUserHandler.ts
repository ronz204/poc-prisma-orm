import type { Handler } from "@Handlers/Handler";
import type { UpdateUserCommand } from "./UpdateUserSchema";
import type { UpdateUserResponse } from "./UpdateUserResponse";

import { PrismaClient } from "generated/prisma";
import { UpdateUserSchema } from "./UpdateUserSchema";
import { UpdateUserDataSpec } from "@Specs/Shared/UpdateUserDataSpec";

export class UpdateUserHandler implements Handler<UpdateUserCommand, UpdateUserResponse> {
  constructor(private prisma: PrismaClient) { };

  public async handle(command: UpdateUserCommand): Promise<UpdateUserResponse> {
    const validated = UpdateUserSchema.parse(command);

    const updateSpec = new UpdateUserDataSpec({ id: validated.id, data: validated });
    const updated = await this.prisma.user.update(updateSpec.toQuery());

    return {
      id: updated.id,
      name: updated.name,
      phone: updated.phone,
      country: updated.country,
    };
  };
};
