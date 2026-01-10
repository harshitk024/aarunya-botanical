-- CreateEnum
CREATE TYPE "PaymentMode" AS ENUM ('COD', 'ONLINE');

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "paymentMode" "PaymentMode" NOT NULL DEFAULT 'COD';
