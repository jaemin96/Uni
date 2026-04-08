import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { REFRESH_COOKIE_NAME, REFRESH_TOKEN_EXPIRY } from "./token";

// 7d in seconds
const REFRESH_TOKEN_MAX_AGE = 7 * 24 * 60 * 60;

export function getRefreshCookieOptions(): Partial<ResponseCookie> {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/api/auth",
    maxAge: REFRESH_TOKEN_MAX_AGE,
  };
}

export function getClearCookieOptions(): Partial<ResponseCookie> {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/api/auth",
    maxAge: 0,
  };
}

export { REFRESH_COOKIE_NAME };
