import type { TokenConfig } from "./types.js";

export function getTokenConfig(): TokenConfig {
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw new Error("JWT_SECRET is required");
  }

  return {
    jwtSecret,
    accessExpiresIn: process.env.JWT_ACCESS_EXPIRES ?? "15m",
    refreshExpiresDays: Number(process.env.JWT_REFRESH_EXPIRES_DAYS ?? "7"),
  };
}

