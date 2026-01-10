/*
  Warnings:

  - You are about to drop the column `feesCents` on the `DoctorProfile` table. All the data in the column will be lost.
  - Added the required column `fees` to the `DoctorProfile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DoctorProfile" DROP COLUMN "feesCents",
ADD COLUMN     "fees" INTEGER NOT NULL;
