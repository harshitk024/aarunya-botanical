// src/modules/admin/admin.routes.ts
import { Router } from "express";
import {
  getAllDoctors,
  toggleDoctorStatus,
  upsertWeeklyAvailability,
  blockDate,
  getAllAppointments,
  cancelAppointment,
  getDashboardData,
  addDoctor,
  getAllOrders,
  updateOrderStatus
} from "./admin.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { adminMiddleware } from "../../middlewares/admin.middleware";
const router = Router();

router.use(authMiddleware, adminMiddleware);

router.get("/doctors", getAllDoctors);
router.post("/add-doctor",addDoctor)
router.patch("/doctors/status", toggleDoctorStatus);

router.post("/availability/weekly", upsertWeeklyAvailability);
router.post("/availability/block", blockDate);

router.get("/appointments", getAllAppointments);
router.patch("/appointments/:id/cancel", cancelAppointment);
router.patch("/orders/:orderId/status",updateOrderStatus)

router.get("/dashboard", getDashboardData);
router.get("/orders",getAllOrders)

export default router;
