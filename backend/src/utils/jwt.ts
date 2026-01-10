import jwt, { JwtPayload } from "jsonwebtoken";
import "dotenv/config"
// Shape of data stored in JWT
export interface JwtUserPayload {
  userId: String;
  role: string;
}

// Ensure secret exists at runtime
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

export const signToken = (payload: JwtUserPayload): string => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "7d",
  });
};

export const verifyToken = (token: string): JwtUserPayload => {
  const decoded = jwt.verify(token, JWT_SECRET);

  if (typeof decoded === "string") {
    throw new Error("Invalid token payload");
  }

  return decoded as JwtUserPayload;
};
