import bcrypt from "bcrypt";
import prisma from "../../config/prisma";
import { Role } from "@prisma/client";
import { generateEmailToken } from "../../utils/token";
import { sendVerificationEmail } from "../../utils/email";

// Input types
interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

interface LoginInput {
  email: string;
  password: string;
}

// Safe user type (correct Prisma types)
type SafeUser = {
  id: String;
  name: string | null;
  email: string;
  role: Role;
  createdAt: Date;
};
export const saveRefreshToken = async (
  userId: any,
  refreshToken: any
) => {
  const hashedToken = await bcrypt.hash(refreshToken, 12);

  await prisma.user.update({
    where: { id: userId },
    data: { refreshToken: hashedToken },
  });
};

export const registerUser = async ({
  name,
  email,
  password,
}: RegisterInput): Promise<SafeUser> => {
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("Email already registered");
  }

  if (!password || typeof password !== "string") {
    throw new Error("Password must be a non-empty string");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const verificationToken = generateEmailToken();
  const verificationExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: Role.USER,
      isEmailVerified: false,
      emailVerificationToken: verificationToken,
      emailVerificationExpires: verificationExpires,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });

  sendVerificationEmail(email, verificationToken);

  return user;
};


export const loginUser = async ({
  email,
  password,
}: LoginInput): Promise<SafeUser> => {
  const user = await prisma.user.findUnique({
    where: { email },
    // ✅ explicitly include password
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      password: true,
      createdAt: true,
    },
  });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  // ✅ remove password safely
  const { password: _, ...safeUser } = user;
  return safeUser;
};
