import type { Handler } from "@Handlers/Handler";
import type { CreateUserCommand } from "./CreateUserSchema";
import type { CreateUserResponse } from "./CreateUserResponse";

import { PrismaClient } from "generated/prisma";
import { CreateUserSchema } from "./CreateUserSchema";
import { CreateNewUserSpec } from "@Specs/Shared/CreateNewUserSpec";
import { ExistUserByEmailSpec } from "@Specs/Shared/ExistUserByEmailSpec";

export class CreateUserHandler implements Handler<CreateUserCommand, CreateUserResponse> {
  constructor(private prisma: PrismaClient) { };

  public async handle(command: CreateUserCommand): Promise<CreateUserResponse> {
    const validated = CreateUserSchema.parse(command);

    const existSpec = new ExistUserByEmailSpec({ email: validated.email });
    const existing = await this.prisma.user.findFirst(existSpec.toQuery());

    if (existing) throw new Error("User with this email already exists");

    const createSpec = new CreateNewUserSpec({ data: validated });
    const created = await this.prisma.user.create(createSpec.toQuery());

    return {
      id: created.id,
      name: created.name,
      phone: created.phone,
      country: created.country,
    };
  };
};
