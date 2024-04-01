/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Region` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isVerified" BOOLEAN;

-- CreateIndex
CREATE UNIQUE INDEX "Region_name_key" ON "Region"("name");
