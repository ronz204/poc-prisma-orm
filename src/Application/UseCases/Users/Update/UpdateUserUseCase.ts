import type { UseCase } from "@UseCases/UseCase";
import type { UpdateUserCommand } from "./UpdateUserCommand";
import type { UpdateUserResponse } from "./UpdateUserResponse";

import { PrismaClient } from "generated/prisma";
import { UpdateUserSchema } from "./UpdateUserSchema";
import { BcryptService } from "@Services/Bcrypt/BcryptService";

export class UpdateUserUseCase implements UseCase<UpdateUserCommand, UpdateUserResponse> {
  constructor(private readonly prisma: PrismaClient) {};
  
  public async execute(command: UpdateUserCommand): Promise<UpdateUserResponse> {
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
