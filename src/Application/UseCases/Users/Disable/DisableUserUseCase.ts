import type { UseCase } from "@UseCases/UseCase";
import type { DisableUserCommand } from "./DisableUserSchema";

import { PrismaClient } from "generated/prisma";
import { DisableUserSchema } from "./DisableUserSchema";

export class DisableUserUseCase implements UseCase<DisableUserCommand, { status: boolean }> {
  constructor(private readonly prisma: PrismaClient) {};

  public async execute(command: DisableUserCommand): Promise<{ status: boolean }> {
    const validated = await DisableUserSchema.validate(command);

    const existing = await this.prisma.user.findFirst({ where: { email: validated.email } });
    if (!existing) throw new Error("User not found");

    await this.prisma.user.update({
      where: { email: validated.email },
      data: { isActive: false },
    });

    return { status: true };
  };
};
