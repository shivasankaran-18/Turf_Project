/*
  Warnings:

  - The primary key for the `adminDetails` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Id` on the `adminDetails` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[adminId]` on the table `Turf` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[turfId]` on the table `adminDetails` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `turfId` to the `adminDetails` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Turf" DROP CONSTRAINT "Turf_adminId_fkey";

-- AlterTable
ALTER TABLE "adminDetails" DROP CONSTRAINT "adminDetails_pkey",
DROP COLUMN "Id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "turfId" INTEGER NOT NULL,
ADD CONSTRAINT "adminDetails_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Turf_adminId_key" ON "Turf"("adminId");

-- CreateIndex
CREATE UNIQUE INDEX "adminDetails_turfId_key" ON "adminDetails"("turfId");
