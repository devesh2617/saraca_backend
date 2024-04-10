/*
  Warnings:

  - Added the required column `imgReference` to the `Blog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imgReference` to the `News` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imgReference` to the `Webinar` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imgReference` to the `WhitePaper` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Blog" ADD COLUMN     "imgReference" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "News" ADD COLUMN     "imgReference" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Webinar" ADD COLUMN     "imgReference" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "WhitePaper" ADD COLUMN     "imgReference" TEXT NOT NULL;
