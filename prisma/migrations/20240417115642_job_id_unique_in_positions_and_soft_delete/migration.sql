/*
  Warnings:

  - A unique constraint covering the columns `[jobId]` on the table `Position` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Position" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "Position_jobId_key" ON "Position"("jobId");
