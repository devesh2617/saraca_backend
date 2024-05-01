/*
  Warnings:

  - Added the required column `date` to the `Blog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `Webinar` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Blog" ADD COLUMN     "date" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Webinar" ADD COLUMN     "date" TEXT NOT NULL;
