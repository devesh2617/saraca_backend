/*
  Warnings:

  - Added the required column `industry` to the `CaseStudy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `industry` to the `WhitePaper` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CaseStudy" ADD COLUMN     "industry" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "WhitePaper" ADD COLUMN     "industry" TEXT NOT NULL;
