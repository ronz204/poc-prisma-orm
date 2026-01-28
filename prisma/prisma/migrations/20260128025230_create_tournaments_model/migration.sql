-- CreateEnum
CREATE TYPE "esports"."tournament_status" AS ENUM ('REGISTRATION_OPEN', 'REGISTRATION_CLOSED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "esports"."tournament_format" AS ENUM ('SINGLE_ELIMINATION', 'DOUBLE_ELIMINATION', 'ROUND_ROBIN', 'GROUP_STAGE', 'SWISS');

-- CreateTable
CREATE TABLE "esports"."tournaments" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "gameId" INTEGER NOT NULL,
    "status" "esports"."tournament_status" NOT NULL DEFAULT 'REGISTRATION_OPEN',
    "format" "esports"."tournament_format" NOT NULL DEFAULT 'SINGLE_ELIMINATION',
    "maxTeams" INTEGER NOT NULL,
    "minTeamSize" INTEGER NOT NULL,
    "maxTeamSize" INTEGER NOT NULL,
    "prizePool" DECIMAL(65,30) NOT NULL,
    "currency" TEXT NOT NULL,
    "registrationStart" TIMESTAMP(3) NOT NULL,
    "registrationEnd" TIMESTAMP(3) NOT NULL,
    "tournamentStart" TIMESTAMP(3) NOT NULL,
    "tournamentEnd" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tournaments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tournaments_title_key" ON "esports"."tournaments"("title");

-- AddForeignKey
ALTER TABLE "esports"."tournaments" ADD CONSTRAINT "tournaments_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "esports"."games"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
