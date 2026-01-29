-- CreateTable
CREATE TABLE "esports"."registrations" (
    "id" SERIAL NOT NULL,
    "isApproved" BOOLEAN NOT NULL DEFAULT false,
    "isCheckedIn" BOOLEAN NOT NULL DEFAULT false,
    "finalStanding" INTEGER,
    "teamId" INTEGER NOT NULL,
    "tournamentId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "registrations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "esports"."registrations" ADD CONSTRAINT "registrations_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "esports"."teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "esports"."registrations" ADD CONSTRAINT "registrations_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "esports"."tournaments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
