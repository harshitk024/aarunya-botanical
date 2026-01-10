import { Router } from "express";
import { addToCart, getCart, removeFromCart } from "./cart.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";

const router = Router();

router.use(authMiddleware);

router.post("/", addToCart);
router.get("/", getCart);
router.delete("/:productId", removeFromCart);

export default router;
