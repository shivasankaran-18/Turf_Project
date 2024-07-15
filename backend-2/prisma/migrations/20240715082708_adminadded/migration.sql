-- AlterTable
ALTER TABLE "Turf" ADD COLUMN     "adminId" INTEGER NOT NULL DEFAULT -1,
ADD COLUMN     "likes" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "Reviews" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "like" INTEGER NOT NULL,
    "turfId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "adminDetails" (
    "Id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "emailId" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "adminDetails_pkey" PRIMARY KEY ("Id")
);
