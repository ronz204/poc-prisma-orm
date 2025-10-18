-- CreateTable
CREATE TABLE "public"."Seeder" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "executedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Seeder_pkey" PRIMARY KEY ("id")
);
