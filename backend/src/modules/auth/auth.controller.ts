import { Request, Response } from "express";
import { AuthRequest } from "../../middlewares/auth.middleware";
import prisma from "../../config/prisma";
import {
  registerUser,
  loginUser,
  saveRefreshToken,
} from "./auth.service";
import {
  signAccessToken,
  signRefreshToken,
} from "../../utils/jwt";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
/* =====================
   REGISTER
===================== */
export const register = async (req: any, res: any) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const user = await registerUser({ name, email, password });

    // Auto-login after register (optional but common)
    const payload = { userId: user.id, role: user.role };

    const accessToken = signAccessToken(payload);
    const refreshToken = signRefreshToken(payload);

    await saveRefreshToken(user.id, refreshToken);

    setAuthCookies(res, accessToken, refreshToken);

    return res.status(201).json({
      message: "Registration successful",
      user,
    });
  } catch (err) {
    return res.status(400).json({
      message: err instanceof Error ? err.message : "Registration failed",
    });
  }
};

/* =====================
   LOGIN
===================== */
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }
    console.log("User LOGIN!!")

    const user = await loginUser({ email, password });

    const payload = { userId: user.id, role: user.role };

    const accessToken = signAccessToken(payload);
    const refreshToken = signRefreshToken(payload);

    await saveRefreshToken(user.id, refreshToken);

    setAuthCookies(res, accessToken, refreshToken);

    console.log("LOGIN USER: ",user)


    return res.json({
      user,
    });
  } catch (err) {
    console.log(err)
    return res.status(401).json({
      message: err instanceof Error ? err.message : "Invalid credentials",
    });
  }
};

export const me = async(req: AuthRequest,res: Response) => {

 const userId = req.user!.userId;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
        name: true,
        email: true,
        image: true,
        gender: true,
        phone: true,
        address: true,
        createdAt: true,
        updatedAt: true,
    },
  });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.json({ user });
}

export const logout = async (req: AuthRequest, res: Response) => {
  try {
    // 1️⃣ Invalidate refresh token in DB
    if (req.user?.userId) {
      await prisma.user.update({
        where: { id: req.user.userId },
        data: { refreshToken: null },
      });
    }

    // 2️⃣ Clear cookies
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
    });

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
    });

    return res.json({ message: "Logged out successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Logout failed" });
  }
};

export const refresh = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ message: "No refresh token" });
    }

    const payload = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET!
    ) as { userId: string; role: string };

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
    });

    if (!user || !user.refreshToken) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    // 3️⃣ Compare hashed refresh token
    const valid = await bcrypt.compare(refreshToken, user.refreshToken);
    if (!valid) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    // 4️⃣ Issue new access token
    const newAccessToken = signAccessToken({
      userId: user.id,
      role: user.role,
    });

    const isProd = process.env.NODE_ENV === "production";

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "strict" : "lax",
      maxAge: 15 * 60 * 1000,
    });

    return res.json({ message: "Access token refreshed" });
  } catch (err) {
    return res.status(401).json({ message: "Refresh failed" });
  }
};
/* =====================
   COOKIE HELPER
===================== */

const isProd = process.env.NODE_ENV === "production"

const setAuthCookies = (
  res: Response,
  accessToken: string,
  refreshToken: string
) => {
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "strict" : "lax",
    maxAge: 15*60*1000, // 60 secs
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "strict" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};
