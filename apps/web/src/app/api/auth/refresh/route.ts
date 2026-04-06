import { NextResponse } from "next/server";

import { refresh } from "@mono/auth-core";

import { authErrorResponse, getRefreshTokenFromCookies, setRefreshCookie } from "../_shared";

export async function POST() {
  const refreshToken = await getRefreshTokenFromCookies();

  if (!refreshToken) {
    return NextResponse.json({ message: "리프레시 토큰이 없습니다" }, { status: 401 });
  }

  try {
    const result = await refresh(refreshToken);
    const response = NextResponse.json({
      accessToken: result.accessToken,
      user: result.user,
    });
    setRefreshCookie(response, result.refreshToken);
    return response;
  } catch (error) {
    return authErrorResponse(error);
  }
}

