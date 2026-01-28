-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "esports";

-- CreateEnum
CREATE TYPE "esports"."player_status" AS ENUM ('ACTIVE', 'RETIRED', 'INACTIVE', 'SUSPENDED');

-- CreateTable
CREATE TABLE "esports"."players" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "isFreeAgent" BOOLEAN NOT NULL DEFAULT false,
    "status" "esports"."player_status" NOT NULL DEFAULT 'ACTIVE',
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
