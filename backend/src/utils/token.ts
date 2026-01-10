import crypto from "crypto";

export const generateEmailToken = (): string => {
  return crypto.randomBytes(32).toString("hex");
};
