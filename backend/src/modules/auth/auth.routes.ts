import express from "express";
import { register, login } from "./auth.controller";
import { verifyEmail } from "./verify.controller";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/verify-email",verifyEmail)

export default router;
