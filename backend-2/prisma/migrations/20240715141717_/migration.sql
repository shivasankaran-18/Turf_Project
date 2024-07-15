/*
  Warnings:

  - You are about to drop the column `turfId` on the `adminDetails` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "adminDetails_turfId_key";

-- AlterTable
ALTER TABLE "adminDetails" DROP COLUMN "turfId";
