/*
  Warnings:

  - Added the required column `tournamentId` to the `moders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "esports"."moders" ADD COLUMN     "tournamentId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "esports"."moders" ADD CONSTRAINT "moders_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "esports"."tournaments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
