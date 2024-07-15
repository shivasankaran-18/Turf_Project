/*
  Warnings:

  - A unique constraint covering the columns `[emailId]` on the table `adminDetails` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Turf" DROP CONSTRAINT "Turf_adminId_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "adminDetails_emailId_key" ON "adminDetails"("emailId");

-- AddForeignKey
ALTER TABLE "Turf" ADD CONSTRAINT "Turf_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "adminDetails"("Id") ON DELETE CASCADE ON UPDATE CASCADE;
