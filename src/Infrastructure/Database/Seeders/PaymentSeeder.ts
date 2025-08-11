import { Seeder } from "@Database/Seeder";
import type { PrismaClient } from "generated/prisma";
import { PaymentFactory } from "@Database/Factories/PaymentFactory";
import { LuxonHelper } from "@Helpers/LuxonHelper";

export class PaymentSeeder extends Seeder {
  constructor(prisma: PrismaClient) {
    super(prisma, "payment-seeder");
  };

  public async seed(): Promise<void> {
    const invoices = await this.prisma.invoice.findMany({
      where: { status: "paid" },
    });

    await Promise.all(invoices.map(async (invoice) => {
      const paymentDate = LuxonHelper.between(invoice.issueDate, invoice.dueDate);

      const payment = await PaymentFactory.build({
        invoiceId: invoice.id,
        amountPaid: invoice.amount,
        paymentDate: paymentDate,
      });

      await this.prisma.payment.create({
        data: {
          invoiceId: payment.invoiceId,
          amountPaid: payment.amountPaid,
          paymentDate: paymentDate,
        },
      });
    }));
  };
};