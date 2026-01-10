import { Router } from "express";
import { getCloudinarySignature } from "./cloudinary.controller";

const router = Router();
router.post("/signature", getCloudinarySignature);

export default router;
