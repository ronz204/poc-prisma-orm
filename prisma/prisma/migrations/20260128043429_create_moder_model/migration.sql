-- CreateEnum
CREATE TYPE "esports"."moder_role" AS ENUM ('ADMIN', 'VIEWER', 'REFEREE');

-- CreateTable
CREATE TABLE "esports"."moders" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "esports"."moder_role" NOT NULL DEFAULT 'VIEWER',
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "moders_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "moders_name_key" ON "esports"."moders"("name");

-- CreateIndex
CREATE UNIQUE INDEX "moders_email_key" ON "esports"."moders"("email");
