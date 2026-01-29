import express from "express";
import cors from "cors";
import authRoutes from "./modules/auth/auth.routes";
import productRoutes from "./modules/product/product.routes"
import cartRoutes from "./modules/cart/cart.routes"
import userRoutes from "./modules/user/user.routes"
import cookieParser from "cookie-parser"
import adminRoutes from "./modules/admin/admin.routes"
import doctorRoutes from "./modules/doctor/doctor.routes"
import appointmentRoutes from "./modules/appointment/appointment.routes"
import cloudinaryRoutes from "./modules/cloudinary/cloudinary.routes"
import meetingRoutes from "./modules/meeting/meeting.routes"
import timeout from "connect-timeout"


const app = express();

app.set("trust proxy",1)
app.use(cookieParser())
app.use(timeout("10m"))
app.use(cors({origin: "https://www.aarunyabotanicals.com",credentials: true}));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/products",productRoutes)
app.use("/api/cart",cartRoutes)
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
