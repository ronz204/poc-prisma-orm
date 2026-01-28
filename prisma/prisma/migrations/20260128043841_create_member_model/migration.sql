-- CreateEnum
CREATE TYPE "esports"."member_role" AS ENUM ('SUBSTITUTE', 'CAPTAIN', 'PLAYER', 'COACH');

-- CreateTable
CREATE TABLE "esports"."members" (
    "id" SERIAL NOT NULL,
    "role" "esports"."member_role" NOT NULL DEFAULT 'PLAYER',
    "teamId" INTEGER NOT NULL,
    "playerId" INTEGER NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "leftAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "members_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "members_teamId_playerId_key" ON "esports"."members"("teamId", "playerId");

-- AddForeignKey
ALTER TABLE "esports"."members" ADD CONSTRAINT "members_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "esports"."teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "esports"."members" ADD CONSTRAINT "members_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "esports"."players"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
