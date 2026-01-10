import express from "express";
import cors from "cors";
import authRoutes from "./modules/auth/auth.routes";
import productRoutes from "./modules/product/product.routes"
import cartRoutes from "./modules/cart/cart.routes"
import orderRoutes from "./modules/order/order.routes"
import userRoutes from "./modules/user/user.routes"
import adminRoutes from "./modules/admin/admin.routes"
import doctorRoutes from "./modules/doctor/doctor.routes"
import appointmentRoutes from "./modules/appointment/appointment.routes"
import cloudinaryRoutes from "./modules/cloudinary/cloudinary.routes"
import meetingRoutes from "./modules/meeting/meeting.routes"
import timeout from "connect-timeout"


const app = express();

app.use(timeout("10m"))
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/products",productRoutes)
app.use("/api/cart",cartRoutes)
app.use("/api/orders",orderRoutes)
app.use("/api/user",userRoutes)
app.use("/api/admin",adminRoutes)
app.use("/api/doctor",doctorRoutes)
app.use("/api/appointments",appointmentRoutes)
app.use("/api/cloudinary",cloudinaryRoutes)
app.use("/api/meeting",meetingRoutes)
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

export default app;
