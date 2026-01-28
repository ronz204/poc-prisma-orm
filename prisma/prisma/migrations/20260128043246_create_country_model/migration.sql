/*
  Warnings:

  - Added the required column `countryId` to the `players` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "esports"."players" ADD COLUMN     "countryId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "esports"."countries" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "countries_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "countries_name_key" ON "esports"."countries"("name");

-- CreateIndex
CREATE UNIQUE INDEX "countries_code_key" ON "esports"."countries"("code");

-- AddForeignKey
ALTER TABLE "esports"."players" ADD CONSTRAINT "players_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "esports"."countries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
