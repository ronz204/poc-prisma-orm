import type { PlanDTO } from "@DTOs/PlanDTO";
import type { UseCase } from "@UseCases/UseCase";
import type { CreatePlanCommand } from "./CreatePlanSchema";

import { PrismaClient } from "generated/prisma";
import { CreatePlanSchema } from "./CreatePlanSchema";

export class CreatePlanUseCase implements UseCase<CreatePlanCommand, PlanDTO> {
  constructor(private readonly prisma: PrismaClient) {};

  public async execute(command: CreatePlanCommand): Promise<PlanDTO> {
    const validated = await CreatePlanSchema.validate(command);

    const existing = await this.prisma.plan.findFirst({
      where: { name: validated.name }
    });

    if (existing) throw new Error("Plan already exists");

    const created = await this.prisma.plan.create({
      data: {
        name: validated.name,
        price: validated.price,
        period: validated.period,
        isActive: validated.isActive
      }
    });

    return {
      id: created.id,
      name: created.name,
      price: created.price,
      period: created.period
    };
  };
};
