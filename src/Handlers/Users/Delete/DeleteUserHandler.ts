import type { Handler } from "@Handlers/Handler";
import type { DeleteUserCommand } from "./DeleteUserSchema";
import type { DeleteUserResponse } from "./DeleteUserResponse";

import { PrismaClient } from "generated/prisma";
import { DeleteUserSchema } from "./DeleteUserSchema";
import { FilterByUserIDSpec } from "@Specs/Shared/FilterByUserIDSpec";

export class DeleteUserHandler implements Handler<DeleteUserCommand, DeleteUserResponse> {
  constructor(private prisma: PrismaClient) { };

  public async handle(command: DeleteUserCommand): Promise<DeleteUserResponse> {
    const validated = DeleteUserSchema.parse(command);

    const filter = new FilterByUserIDSpec({ id: validated.id });
    const deleted = await this.prisma.user.delete(filter.toQuery());

    return {
      id: deleted.id,
      name: deleted.name,
      phone: deleted.phone,
      country: deleted.country,
    };
  };
};
