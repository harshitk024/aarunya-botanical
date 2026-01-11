import { Router } from "express";
import { bookAppointment,cancelAppointment,getAvailableSlots, getUserAppointments } from "./appointment.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();

router.get("/:doctorId/availability",getAvailableSlots)
router.use(authMiddleware);

router.post("/:doctorId/book", bookAppointment);
router.get("/",getUserAppointments)
router.post("/cancel-appointment",cancelAppointment)

export default router;
