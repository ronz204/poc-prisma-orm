/*
  Warnings:

  - You are about to alter the column `amount` on the `Invoice` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(65,2)`.
  - You are about to alter the column `amountPaid` on the `Payment` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(65,2)`.
  - You are about to alter the column `price` on the `Plan` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(65,2)`.

*/
-- AlterTable
ALTER TABLE "Invoice" ALTER COLUMN "amount" DROP DEFAULT,
ALTER COLUMN "amount" SET DATA TYPE DECIMAL(65,2);

-- AlterTable
ALTER TABLE "Payment" ALTER COLUMN "amountPaid" DROP DEFAULT,
ALTER COLUMN "amountPaid" SET DATA TYPE DECIMAL(65,2);

-- AlterTable
ALTER TABLE "Plan" ALTER COLUMN "price" DROP DEFAULT,
ALTER COLUMN "price" SET DATA TYPE DECIMAL(65,2);
