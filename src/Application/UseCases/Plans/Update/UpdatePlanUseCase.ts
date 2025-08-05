import type { PlanDTO } from "@DTOs/PlanDTO";
import type { UseCase } from "@UseCases/UseCase";
import type { UpdatePlanCommand } from "./UpdatePlanSchema";

import { PrismaClient } from "generated/prisma";
import { UpdatePlanSchema } from "./UpdatePlanSchema";

export class UpdatePlanUseCase implements UseCase<UpdatePlanCommand, PlanDTO> {
  constructor(private readonly prisma: PrismaClient) {};

  async execute(command: UpdatePlanCommand): Promise<PlanDTO> {
    const validated = await UpdatePlanSchema.validate(command);

    const existing = await this.prisma.plan.findUnique({ where: { id: validated.id } });
    if (!existing) throw new Error("Plan not found");

    const updated = await this.prisma.plan.update({
      where: { id: validated.id },
      data: {
        name: validated.name,
        price: validated.price,
        period: validated.period,
        isActive: validated.isActive,
      },
    });

    return {
      id: updated.id,
      name: updated.name,
      price: updated.price,
      period: updated.period,
    };
  };
};
