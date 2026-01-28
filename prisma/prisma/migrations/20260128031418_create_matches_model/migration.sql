-- CreateEnum
CREATE TYPE "esports"."tournament_phase" AS ENUM ('GROUPS', 'ROUND_OF_32', 'ROUND_OF_16', 'QUARTERFINALS', 'SEMIFINALS', 'THIRD_PLACE', 'FINALS');

-- CreateTable
CREATE TABLE "esports"."matches" (
    "id" SERIAL NOT NULL,
    "tournamentId" INTEGER NOT NULL,
    "teamAlphaId" INTEGER NOT NULL,
    "teamBetaId" INTEGER NOT NULL,
    "winnerId" INTEGER,
    "phase" "esports"."tournament_phase" NOT NULL DEFAULT 'GROUPS',
    "scheduledAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "teamId" INTEGER,

    CONSTRAINT "matches_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "esports"."matches" ADD CONSTRAINT "matches_teamAlphaId_fkey" FOREIGN KEY ("teamAlphaId") REFERENCES "esports"."teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "esports"."matches" ADD CONSTRAINT "matches_teamBetaId_fkey" FOREIGN KEY ("teamBetaId") REFERENCES "esports"."teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "esports"."matches" ADD CONSTRAINT "matches_winnerId_fkey" FOREIGN KEY ("winnerId") REFERENCES "esports"."teams"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "esports"."matches" ADD CONSTRAINT "matches_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "esports"."tournaments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "esports"."matches" ADD CONSTRAINT "matches_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "esports"."teams"("id") ON DELETE SET NULL ON UPDATE CASCADE;
