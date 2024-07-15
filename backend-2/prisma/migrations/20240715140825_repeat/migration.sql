-- AddForeignKey
ALTER TABLE "Turf" ADD CONSTRAINT "Turf_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "adminDetails"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
