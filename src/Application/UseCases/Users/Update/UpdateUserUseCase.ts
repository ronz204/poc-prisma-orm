import type { UserDTO } from "@DTOs/UserDTO";
import type { UseCase } from "@UseCases/UseCase";
import type { UpdateUserCommand } from "./UpdateUserSchema";

import { PrismaClient } from "generated/prisma";
import { UpdateUserSchema } from "./UpdateUserSchema";
import { BcryptService } from "@Services/Bcrypt/BcryptService";

export class UpdateUserUseCase implements UseCase<UpdateUserCommand, UserDTO> {
  constructor(private readonly prisma: PrismaClient) {};
  
  public async execute(command: UpdateUserCommand): Promise<UserDTO> {
    const validated = await UpdateUserSchema.validate(command);

    const existing = await this.prisma.user.findFirst({ where: { email: validated.email } });
    if (!existing) throw new Error("User not found");

    if (validated.password) {
      validated.password = await BcryptService.hash(validated.password);
    };

    const updated = await this.prisma.user.update({
      where: { email: validated.email },
      data: {
        name: validated.name,
        password: validated.password,
        biography: validated.biography,
        pictureUrl: validated.pictureUrl,
      },
    });

    return {
      id: updated.id,
      name: updated.name,
      biography: updated.biography,
      pictureUrl: updated.pictureUrl,
    };
  };
};
