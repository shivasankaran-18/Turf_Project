-- DropForeignKey
ALTER TABLE "Turf" DROP CONSTRAINT "Turf_adminId_fkey";

-- AddForeignKey
ALTER TABLE "Turf" ADD CONSTRAINT "Turf_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "adminDetails"("id") ON DELETE CASCADE ON UPDATE CASCADE;
