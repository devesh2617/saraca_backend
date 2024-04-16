/*
  Warnings:

  - Added the required column `pdf` to the `WhitePaper` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WhitePaper" ADD COLUMN     "pdf" TEXT NOT NULL;
