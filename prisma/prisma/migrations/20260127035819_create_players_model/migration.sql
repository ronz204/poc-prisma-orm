-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "esports";

-- CreateEnum
CREATE TYPE "esports"."player_status" AS ENUM ('ACTIVE', 'INACTIVE', 'RETIRED', 'BANNED');

-- CreateTable
CREATE TABLE "esports"."players" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "isFree" BOOLEAN NOT NULL DEFAULT true,
    "status" "esports"."player_status" NOT NULL DEFAULT 'ACTIVE',
    "eloRating" INTEGER NOT NULL DEFAULT 0,
    "totalWins" INTEGER NOT NULL DEFAULT 0,
    "totalLosses" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "players_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "players_name_key" ON "esports"."players"("name");

-- CreateIndex
CREATE UNIQUE INDEX "players_email_key" ON "esports"."players"("email");
