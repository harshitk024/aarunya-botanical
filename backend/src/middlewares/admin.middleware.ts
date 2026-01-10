export const adminMiddleware = (req: any, res: any, next: any) => {
  if (!req.user || req.user.role !== "ADMIN") {
    return res.status(403).json({
      message: "Admin access required",
    });
  }

  next();
};
