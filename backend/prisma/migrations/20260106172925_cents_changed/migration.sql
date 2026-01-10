/*
  Warnings:

  - You are about to drop the column `amountCents` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `totalCents` on the `Order` table. All the data in the column will be lost.
  - Added the required column `amount` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "amountCents",
ADD COLUMN     "amount" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "totalCents",
ADD COLUMN     "total" INTEGER NOT NULL;
