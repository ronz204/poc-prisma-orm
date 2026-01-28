-- CreateEnum
CREATE TYPE "esports"."sponsor_tier" AS ENUM ('GOLD', 'SILVER', 'BRONZE');

-- CreateTable
CREATE TABLE "esports"."sponsors" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "tier" "esports"."sponsor_tier" NOT NULL,
    "logoUrl" TEXT,
    "websiteUrl" TEXT,
    "contactEmail" TEXT,
    "contactPhone" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sponsors_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "sponsors_name_key" ON "esports"."sponsors"("name");
