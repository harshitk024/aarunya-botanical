/*
  Warnings:

  - A unique constraint covering the columns `[doctorId,dayOfWeek]` on the table `WeeklyAvailability` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "WeeklyAvailability_doctorId_dayOfWeek_key" ON "WeeklyAvailability"("doctorId", "dayOfWeek");
