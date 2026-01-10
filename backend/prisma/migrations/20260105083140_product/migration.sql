-- CreateEnum
CREATE TYPE "Type" AS ENUM ('HEALTH', 'SKIN', 'HAIR', 'UNKNOWN');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "type" "Type" NOT NULL DEFAULT 'UNKNOWN';
