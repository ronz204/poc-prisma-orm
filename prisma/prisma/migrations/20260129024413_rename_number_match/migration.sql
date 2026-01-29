/*
  Warnings:

  - You are about to drop the column `matchNumber` on the `matches` table. All the data in the column will be lost.
  - Added the required column `number` to the `matches` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "esports"."matches" DROP COLUMN "matchNumber",
ADD COLUMN     "number" INTEGER NOT NULL;
