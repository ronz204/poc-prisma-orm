import type { Handler } from "@Handlers/Handler";
import type { CreateUserCommand } from "./CreateUserSchema";
import type { CreateUserResponse } from "./CreateUserResponse";

import { CreateUserSchema } from "./CreateUserSchema";

export class CreateUserHandler implements Handler<CreateUserCommand, CreateUserResponse> {
  constructor() { };

  public async handle(command: CreateUserCommand): Promise<CreateUserResponse> {
    const validated = CreateUserSchema.parse(command);

    return {
      id: 1,
      name: validated.name,
      phone: validated.phone,
      country: validated.country,
    };
  };
};
