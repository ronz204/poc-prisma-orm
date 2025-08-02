import type { UserDTO } from "@DTOs/UserDTO";
import type { UseCase } from "@UseCases/UseCase";
import type { CreateUserCommand } from "./CreateUserSchema";

import { PrismaClient } from "generated/prisma";
import { CreateUserSchema } from "./CreateUserSchema";
import { BcryptService } from "@Services/Bcrypt/BcryptService";

export class CreateUserUseCase implements UseCase<CreateUserCommand, UserDTO> {
  constructor(private readonly prisma: PrismaClient) {};

  public async execute(command: CreateUserCommand): Promise<UserDTO> {
    const validated = await CreateUserSchema.validate(command);

    const existing = await this.prisma.user.findFirst({
      where: { name: validated.name, email: validated.email }
    });

    if (existing) throw new Error("User already exists");

    const hashed = await BcryptService.hash(validated.password);
    const created = await this.prisma.user.create({
      data: {
        name: validated.name,
        email: validated.email,
        password: hashed,
        biography: validated.biography,
        pictureUrl: validated.pictureUrl
      }
    });

    return {
      id: created.id,
      name: created.name,
      biography: created.biography,
      pictureUrl: created.pictureUrl
    };
  };
};
