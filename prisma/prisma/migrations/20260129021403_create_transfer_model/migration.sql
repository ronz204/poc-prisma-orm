-- CreateTable
CREATE TABLE "esports"."transfers" (
    "id" SERIAL NOT NULL,
    "transferDate" TIMESTAMP(3) NOT NULL,
    "transferFee" DECIMAL(12,2) NOT NULL,
    "playerId" INTEGER NOT NULL,
    "toTeamId" INTEGER NOT NULL,
    "fromTeamId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "transfers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "esports"."transfers" ADD CONSTRAINT "transfers_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "esports"."players"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "esports"."transfers" ADD CONSTRAINT "transfers_toTeamId_fkey" FOREIGN KEY ("toTeamId") REFERENCES "esports"."teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "esports"."transfers" ADD CONSTRAINT "transfers_fromTeamId_fkey" FOREIGN KEY ("fromTeamId") REFERENCES "esports"."teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
