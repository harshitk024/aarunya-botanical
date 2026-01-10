/*
  Warnings:

  - Added the required column `zoomMeetingId` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zoomStartUrl` to the `Appointment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Appointment" ADD COLUMN     "duration" INTEGER NOT NULL DEFAULT 30,
ADD COLUMN     "zoomMeetingId" TEXT NOT NULL,
ADD COLUMN     "zoomStartUrl" TEXT NOT NULL;
