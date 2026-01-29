-- CreateEnum
CREATE TYPE "esports"."match_status" AS ENUM ('SCHEDULED', 'ONGOING', 'COMPLETED', 'CANCELED');

-- CreateEnum
CREATE TYPE "esports"."tournament_phase" AS ENUM ('GROUPS', 'ROUND_OF_32', 'ROUND_OF_16', 'QUARTERFINALS', 'SEMIFINALS', 'THIRD_PLACE', 'FINALS');

-- CreateTable
CREATE TABLE "esports"."matches" (
    "id" SERIAL NOT NULL,
    "status" "esports"."match_status" NOT NULL DEFAULT 'SCHEDULED',
    "phase" "esports"."tournament_phase" NOT NULL,
    "matchNumber" INTEGER NOT NULL,
    "bestOf" INTEGER NOT NULL,
    "tournamentId" INTEGER NOT NULL,
    "teamAlphaId" INTEGER NOT NULL,
    "teamBetaId" INTEGER NOT NULL,
    "teamWinnerId" INTEGER,
    "scoreAlpha" INTEGER NOT NULL DEFAULT 0,
    "scoreBeta" INTEGER NOT NULL DEFAULT 0,
    "startedAt" TIMESTAMP(3),
    "finishedAt" TIMESTAMP(3),
    "scheduledAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "matches_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "esports"."matches" ADD CONSTRAINT "matches_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "esports"."tournaments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "esports"."matches" ADD CONSTRAINT "matches_teamAlphaId_fkey" FOREIGN KEY ("teamAlphaId") REFERENCES "esports"."teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "esports"."matches" ADD CONSTRAINT "matches_teamBetaId_fkey" FOREIGN KEY ("teamBetaId") REFERENCES "esports"."teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "esports"."matches" ADD CONSTRAINT "matches_teamWinnerId_fkey" FOREIGN KEY ("teamWinnerId") REFERENCES "esports"."teams"("id") ON DELETE SET NULL ON UPDATE CASCADE;
