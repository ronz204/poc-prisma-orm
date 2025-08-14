import type { PlanDTO } from "@DTOs/PlanDTO";
import type { UseCase } from "@UseCases/UseCase";
import type { UpdatePlanCommand } from "./UpdatePlanCommand";

import { PrismaClient } from "generated/prisma";
import { UpdatePlanSchema } from "./UpdatePlanSchema";

export class UpdatePlanUseCase implements UseCase<UpdatePlanCommand, PlanDTO> {
  constructor(private readonly prisma: PrismaClient) {};

  public async execute(command: UpdatePlanCommand): Promise<PlanDTO> {
    const validated = await UpdatePlanSchema.validate(command);

    const existing = await this.prisma.plan.findUnique({
      where: { id: validated.id }
    });

    if (!existing) throw new Error("Plan not found");

    const plan = await this.prisma.plan.update({
      where: { id: validated.id }, data: validated,
    });

    return {
      id: plan.id,
      name: plan.name,
      price: plan.price,
      period: plan.period,
    };
  };
};
