-- CreateTable
CREATE TABLE "DoctorImage" (
    "id" TEXT NOT NULL,
    "doctorId" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DoctorImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DoctorImage" ADD CONSTRAINT "DoctorImage_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
