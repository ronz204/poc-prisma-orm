import { Seeder } from "@Database/Seeder";
import type { PrismaClient } from "generated/prisma";

export class PaymentSeeder extends Seeder {
  constructor(prisma: PrismaClient) {
    super(prisma);
  };

  public async seed(): Promise<void> {
    const invoices = await this.prisma.invoice.findMany({
      where: { status: "paid" },
      select: { id: true, amount: true },
    });

    const methods = ["credit_card", "debit_cart", "cash"] as const;

    for (const inv of invoices) {
      const hasPayment = await this.prisma.payment.count({
        where: { invoiceId: inv.id },
      });
      if (hasPayment > 0) continue;

      const method = methods[inv.id % methods.length];

      await this.prisma.payment.create({
        data: {
          invoiceId: inv.id,
          paymentMethod: method,
          amountPaid: inv.amount.toString(),
        },
      });
    };
  };
};
