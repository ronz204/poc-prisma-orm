import type { UseCase } from "@UseCases/UseCase";
import type { UpdateInvoiceCommand } from "./UpdateInvoiceCommand";
import type { UpdateInvoiceResponse } from "./UpdateInvoiceResponse";

import { PrismaClient } from "generated/prisma";
import { UpdateInvoiceSchema } from "./UpdateInvoiceSchema";

export class UpdateInvoiceUseCase implements UseCase<UpdateInvoiceCommand, UpdateInvoiceResponse> {
  constructor(private prisma: PrismaClient) {}

  public async execute(command: UpdateInvoiceCommand): Promise<UpdateInvoiceResponse> {
    const validated = await UpdateInvoiceSchema.validate(command);

    const existing = await this.prisma.invoice.count({
      where: { id: validated.id },
    });

    if (!existing) throw new Error("Invoice not found");

    const updated = await this.prisma.invoice.update({
      where: { id: validated.id },
      data: { status: validated.status },
    });

    return {
      id: updated.id,
      status: updated.status,
    };
  };
};
