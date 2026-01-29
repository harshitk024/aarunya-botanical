import jwt, { JwtPayload } from "jsonwebtoken";
import "dotenv/config";

export interface JwtUserPayload {
  userId: string;
  role: string;
}

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

if (!ACCESS_TOKEN_SECRET || !REFRESH_TOKEN_SECRET) {
  throw new Error("JWT secrets are not defined in env variables");
}



export const signAccessToken = (payload: any): string => {
  return jwt.sign(payload, ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
};

export const signRefreshToken = (payload: any): string => {
  return jwt.sign(payload, REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};


export const verifyAccessToken = (token: string): JwtUserPayload => {
  const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);

  if (typeof decoded === "string") {
    throw new Error("Invalid access token");
  }

  return decoded as JwtUserPayload;
};

export const verifyRefreshToken = (token: string): JwtUserPayload => {
  const decoded = jwt.verify(token, REFRESH_TOKEN_SECRET);

  if (typeof decoded === "string") {
    throw new Error("Invalid refresh token");
  }

  return decoded as JwtUserPayload;
};
