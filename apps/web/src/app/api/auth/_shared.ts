import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { AuthError, getTokenConfig, verifyAccessToken } from "@mono/auth-core";
import { db, users } from "@mono/db";
import { eq } from "drizzle-orm";

const refreshExpiresDays = Number(process.env.JWT_REFRESH_EXPIRES_DAYS ?? "7");

export function setRefreshCookie(response: NextResponse, refreshToken: string) {
  response.cookies.set({
    name: "refresh_token",
    value: refreshToken,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: refreshExpiresDays * 24 * 60 * 60,
  });
}

export function clearRefreshCookie(response: NextResponse) {
  response.cookies.set({
    name: "refresh_token",
    value: "",
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
}

export function authErrorResponse(error: unknown) {
  if (error instanceof AuthError) {
    const status = error.code.includes("INVALID") || error.code.includes("COMPROMISED") ? 401 : 400;
    return NextResponse.json({ message: error.message, code: error.code }, { status });
  }

  return NextResponse.json({ message: "서버 오류가 발생했습니다" }, { status: 500 });
}

export async function requireAccessUser(request: Request) {
  try {
    const authorization = request.headers.get("authorization");
    const token = authorization?.replace(/^Bearer\s+/i, "");

    if (!token) {
      return null;
    }

    const payload = verifyAccessToken(token, getTokenConfig());
    const user = await db.query.users.findFirst({
      where: eq(users.id, String(payload.sub)),
    });

    return user ?? null;
  } catch {
    return null;
  }
}

export async function getRefreshTokenFromCookies() {
  const cookieStore = await cookies();
  return cookieStore.get("refresh_token")?.value ?? null;
}
