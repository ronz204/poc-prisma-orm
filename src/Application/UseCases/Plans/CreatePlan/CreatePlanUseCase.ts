import type { PlanDTO } from "@DTOs/PlanDTO";
import type { UseCase } from "@UseCases/UseCase";
import type { CreatePlanCommand } from "./CreatePlanCommand";

import { PrismaClient } from "generated/prisma";
import { CreatePlanSchema } from "./CreatePlanSchema";

export class CreatePlanUseCase implements UseCase<CreatePlanCommand, PlanDTO> {
  constructor(private readonly prisma: PrismaClient) {};

  public async execute(command: CreatePlanCommand): Promise<PlanDTO> {
    const validated = await CreatePlanSchema.validate(command);

    const existing = await this.prisma.plan.findUnique({
      where: { name: validated.name }
    });

    if (existing) throw new Error("Plan with this name already exists");

    const plan = await this.prisma.plan.create({
      data: validated
    });
    
    return {
      id: plan.id,
      name: plan.name,
      price: plan.price,
      period: plan.period,
    };
  }
};
