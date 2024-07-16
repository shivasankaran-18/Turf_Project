-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Turf" (
    "id" SERIAL NOT NULL,
    "turfName" TEXT NOT NULL,
    "area" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "likes" INTEGER NOT NULL DEFAULT 0,
    "state" TEXT NOT NULL,
    "adminId" INTEGER NOT NULL,
    "Sports" TEXT[],

    CONSTRAINT "Turf_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "adminDetails" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "emailId" TEXT NOT NULL,
    "contact" TEXT,
    "password" TEXT NOT NULL,

    CONSTRAINT "adminDetails_pkey" PRIMARY KEY ("id")
);

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
CREATE TABLE "TurfSlot" (
    "id" SERIAL NOT NULL,
    "date" TEXT NOT NULL,
    "slot" TEXT NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT true,
    "turfId" INTEGER NOT NULL,
    "price" INTEGER NOT NULL DEFAULT 500,

    CONSTRAINT "TurfSlot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserBooking" (
    "id" SERIAL NOT NULL,
    "turfId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "date" TEXT NOT NULL,
    "slot" TEXT NOT NULL,
    "price" INTEGER NOT NULL DEFAULT 500,
    "paid" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "UserBooking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Turf_adminId_key" ON "Turf"("adminId");

-- CreateIndex
CREATE UNIQUE INDEX "adminDetails_emailId_key" ON "adminDetails"("emailId");

-- AddForeignKey
ALTER TABLE "Turf" ADD CONSTRAINT "Turf_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "adminDetails"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_turfId_fkey" FOREIGN KEY ("turfId") REFERENCES "Turf"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TurfSlot" ADD CONSTRAINT "TurfSlot_turfId_fkey" FOREIGN KEY ("turfId") REFERENCES "Turf"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBooking" ADD CONSTRAINT "UserBooking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBooking" ADD CONSTRAINT "UserBooking_turfId_fkey" FOREIGN KEY ("turfId") REFERENCES "Turf"("id") ON DELETE CASCADE ON UPDATE CASCADE;
