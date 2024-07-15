/*
  Warnings:

  - You are about to drop the column `date` on the `TurfSlot` table. All the data in the column will be lost.
  - You are about to drop the column `timeSlots` on the `TurfSlot` table. All the data in the column will be lost.
  - Added the required column `end` to the `TurfSlot` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start` to the `TurfSlot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TurfSlot" DROP COLUMN "date",
DROP COLUMN "timeSlots",
ADD COLUMN     "end" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "start" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "adminDetails" ALTER COLUMN "contact" DROP NOT NULL;
