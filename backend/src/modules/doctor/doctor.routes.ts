import { Router } from "express";
import {
  getDoctorAppointments,
  completeAppointment,
  getPublicDoctors,
  getDoctorDashboard,
  getDoctorProfile,
  updateDoctorProfile,
  getDoctorById
} from "./doctor.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { doctorMiddleware } from "../../middlewares/doctor.middleware";


const router = Router();

router.get("/public",getPublicDoctors)
router.get("/id/:id",getDoctorById)

router.use(authMiddleware,doctorMiddleware);

router.get("/dashboard",getDoctorDashboard)
router.get("/appointments", getDoctorAppointments);
router.patch("/appointments/:id/complete", completeAppointment);
router.get("/profile",getDoctorProfile)
router.post("/update-profile",updateDoctorProfile)

export default router;
