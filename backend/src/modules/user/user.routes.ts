import express from "express"
import { getProfile } from "./user.controller"
import { getCartItems } from "./user.controller"
import {saveUserAddress} from "./user.controller"
import { updateProfile } from "./user.controller"
import { authMiddleware } from "../../middlewares/auth.middleware"
import { getOrders } from "./user.controller"
import { upload } from "../../middlewares/upload"

const userRouter = express.Router()

userRouter.get("/get-profile",authMiddleware,getProfile)
userRouter.patch("/update-profile",authMiddleware,upload.array("images",1),updateProfile)
userRouter.get("/fetch-cart",authMiddleware,getCartItems)
userRouter.get("/orders",authMiddleware,getOrders)
userRouter.put("/save-address",authMiddleware,saveUserAddress)

export default userRouter