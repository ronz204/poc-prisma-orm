/*
  Warnings:

  - You are about to drop the column `contactEmail` on the `sponsors` table. All the data in the column will be lost.
  - You are about to drop the column `contactPhone` on the `sponsors` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "esports"."sponsors" DROP COLUMN "contactEmail",
DROP COLUMN "contactPhone",
ADD COLUMN     "email" TEXT,
ADD COLUMN     "phone" TEXT;
