/*
  Warnings:

  - You are about to drop the column `endTime` on the `UserBooking` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `UserBooking` table. All the data in the column will be lost.
  - Added the required column `slot` to the `UserBooking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserBooking" DROP COLUMN "endTime",
DROP COLUMN "startTime",
ADD COLUMN     "slot" TEXT NOT NULL;
