/*
  Warnings:

  - You are about to drop the column `total_experince_role_description` on the `UserDetails` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserDetails" DROP CONSTRAINT "UserDetails_userId_fkey";

-- AlterTable
ALTER TABLE "UserDetails" DROP COLUMN "total_experince_role_description",
ADD COLUMN     "total_experience_role_description" TEXT,
ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "UserDetails" ADD CONSTRAINT "UserDetails_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
