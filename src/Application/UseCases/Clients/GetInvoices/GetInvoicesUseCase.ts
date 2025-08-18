import type { UseCase } from "@UseCases/UseCase";
import type { GetInvoicesQuery } from "./GetInvoicesQuery";
import type { GetInvoicesResponse } from "./GetInvoicesResponse";

import { PrismaClient } from "generated/prisma";
import { GetInvoicesSchema } from "./GetInvoicesSchema";

export class GetInvoicesUseCase implements UseCase<GetInvoicesQuery, GetInvoicesResponse> {
  constructor(private readonly prisma: PrismaClient) {};

  public async execute(query: GetInvoicesQuery): Promise<GetInvoicesResponse> {
    const validated = await GetInvoicesSchema.validate(query);

    const client = await this.prisma.client.findFirst({
      where: { id: validated.client },
      include: {
        subscription: {
          include: {
            invoice: true,
          },
        },
      },
    });

    if (!client) throw new Error("Client not found");
    const invoices = client.subscription?.invoice.map((inv) => ({
      id: inv.id,
      status: inv.status,
      issueDate: inv.issueDate,
      dueDate: inv.dueDate,
      periodStart: inv.periodStart,
      periodEnd: inv.periodEnd,
      amount: inv.amount,
    })) ?? [];

    return {
      id: client.id,
      name: client.name,
      invoices: invoices,
    };
  };
};
