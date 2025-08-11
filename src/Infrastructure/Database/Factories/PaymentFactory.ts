import { faker } from "@faker-js/faker";
import { Prisma } from "generated/prisma";
import type { Payment } from "generated/prisma";

const METHODS = ["credit_card", "paypal", "bank_transfer"];

export class PaymentFactory {
  public static async build(payment: Partial<Payment>): Promise<Payment> {
    const amountPaid = payment.amountPaid ?? faker.finance.amount({ min: 5, max: 100, dec: 2 });
    const paymentDate = payment.paymentDate ?? faker.date.recent({ days: 30 });

    return {
      id: payment.id ?? faker.number.int({ min: 1, max: 100 }),
      invoiceId: payment.invoiceId ?? faker.number.int({ min: 1, max: 100 }),
      amountPaid: new Prisma.Decimal(amountPaid),
      paymentDate: paymentDate,
      paymentMethod: payment.paymentMethod ?? faker.helpers.arrayElement(METHODS),
      createdAt: payment.createdAt ?? paymentDate,
      updatedAt: payment.updatedAt ?? paymentDate,
    };
  };

  public static async bulk(count: number, payment: Partial<Payment>): Promise<Payment[]> {
    return Promise.all(Array.from({ length: count }).map(() => this.build(payment)));
  };
};