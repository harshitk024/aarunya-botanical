export const doctorMiddleware = (req: any, res: any, next: any) => {
  if (!req.user || req.user.role !== "DOCTOR") {
    return res.status(403).json({
      message: "Doctor access required",
    });
  }

  next();
};
