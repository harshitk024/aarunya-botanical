import express from "express";
import { register, login,me,logout, refresh } from "./auth.controller";
import { verifyEmail } from "./verify.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = express.Router();

router.get("/me",authMiddleware,me)
router.post("/refresh",refresh)
router.post("/register", register);
router.post("/logout",authMiddleware,logout)
router.post("/login", login);
router.get("/verify-email",verifyEmail)

export default router;
