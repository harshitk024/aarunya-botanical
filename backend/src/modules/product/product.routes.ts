import { Router } from "express";
import { createProduct, getProducts,updateProduct,deleteProduct, placeOrder } from "./product.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { adminMiddleware } from "../../middlewares/admin.middleware";
import { upload } from "../../middlewares/upload";
import { addToCart } from "./product.controller";
import { decreaseQuantityInCart,deleteCart } from "./product.controller";

const router = Router();

router.get("/", getProducts);

router.post("/add-cart",authMiddleware,addToCart)
router.post("/decrease-cart",authMiddleware,decreaseQuantityInCart)
router.post("/delete-cart/:productId",authMiddleware,deleteCart)
router.post("/",authMiddleware,adminMiddleware,upload.array("images",5),createProduct);
router.post("/place-order",authMiddleware,placeOrder)


router.put("/:id", authMiddleware, adminMiddleware, updateProduct);
router.delete("/:id", authMiddleware, deleteProduct);


export default router;
