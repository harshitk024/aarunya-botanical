-- CreateIndex
CREATE INDEX "idx_appointment_doctor_time" ON "Appointment"("doctorId", "startTime");
