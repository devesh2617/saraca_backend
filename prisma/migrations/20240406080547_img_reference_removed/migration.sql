/*
  Warnings:

  - You are about to drop the column `imgReference` on the `Blog` table. All the data in the column will be lost.
  - You are about to drop the column `imgReference` on the `News` table. All the data in the column will be lost.
  - You are about to drop the column `imgReference` on the `Webinar` table. All the data in the column will be lost.
  - You are about to drop the column `imgReference` on the `WhitePaper` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Blog" DROP COLUMN "imgReference";

-- AlterTable
ALTER TABLE "News" DROP COLUMN "imgReference";

-- AlterTable
ALTER TABLE "Webinar" DROP COLUMN "imgReference";

-- AlterTable
ALTER TABLE "WhitePaper" DROP COLUMN "imgReference";
