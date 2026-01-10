/*
  Warnings:

  - You are about to drop the column `amount` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `cancelled` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `docData` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `docId` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `isCompleted` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `payment` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `slotDate` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `slotTime` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `userData` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `total` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `Doctor` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `amountCents` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `doctorId` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endTime` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `patientId` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalCents` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priceCents` to the `OrderItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priceCents` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AppointmentStatus" AS ENUM ('SCHEDULED', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "SlotStatus" AS ENUM ('AVAILABLE', 'BLOCKED');

-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'DOCTOR';

-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_docId_fkey";

-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "amount",
DROP COLUMN "cancelled",
DROP COLUMN "date",
DROP COLUMN "docData",
DROP COLUMN "docId",
DROP COLUMN "isCompleted",
DROP COLUMN "payment",
DROP COLUMN "slotDate",
DROP COLUMN "slotTime",
DROP COLUMN "userData",
DROP COLUMN "userId",
ADD COLUMN     "amountCents" INTEGER NOT NULL,
ADD COLUMN     "doctorId" TEXT NOT NULL,
ADD COLUMN     "endTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "patientId" TEXT NOT NULL,
ADD COLUMN     "paymentDone" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "startTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "status" "AppointmentStatus" NOT NULL DEFAULT 'SCHEDULED';

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "total",
ADD COLUMN     "totalCents" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "price",
ADD COLUMN     "priceCents" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "price",
ADD COLUMN     "priceCents" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Doctor";

-- CreateTable
CREATE TABLE "DoctorProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "speciality" TEXT NOT NULL,
    "degree" TEXT NOT NULL,
    "experience" INTEGER NOT NULL,
    "about" TEXT NOT NULL,
    "feesCents" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "DoctorProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WeeklyAvailability" (
    "id" TEXT NOT NULL,
    "doctorId" TEXT NOT NULL,
    "dayOfWeek" INTEGER NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,

    CONSTRAINT "WeeklyAvailability_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AvailabilityOverride" (
    "id" TEXT NOT NULL,
    "doctorId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "status" "SlotStatus" NOT NULL DEFAULT 'BLOCKED',

    CONSTRAINT "AvailabilityOverride_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DoctorProfile_userId_key" ON "DoctorProfile"("userId");

-- CreateIndex
CREATE INDEX "WeeklyAvailability_doctorId_dayOfWeek_idx" ON "WeeklyAvailability"("doctorId", "dayOfWeek");

-- CreateIndex
CREATE INDEX "AvailabilityOverride_doctorId_date_idx" ON "AvailabilityOverride"("doctorId", "date");

-- CreateIndex
CREATE INDEX "Appointment_doctorId_startTime_endTime_idx" ON "Appointment"("doctorId", "startTime", "endTime");

-- AddForeignKey
ALTER TABLE "DoctorProfile" ADD CONSTRAINT "DoctorProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WeeklyAvailability" ADD CONSTRAINT "WeeklyAvailability_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "DoctorProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AvailabilityOverride" ADD CONSTRAINT "AvailabilityOverride_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "DoctorProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
