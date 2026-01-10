import { Router } from "express";
import { checkout } from "./order.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";

const router = Router();

router.post("/checkout", authMiddleware, checkout);

export default router;
