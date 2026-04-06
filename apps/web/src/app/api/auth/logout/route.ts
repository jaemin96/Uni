import { NextResponse } from "next/server";

import { logout } from "@mono/auth-core";

import { authErrorResponse, clearRefreshCookie, requireAccessUser } from "../_shared";

export async function POST(request: Request) {
  try {
    const user = await requireAccessUser(request);
    if (!user) {
      return NextResponse.json({ message: "인증이 필요합니다" }, { status: 401 });
    }

    await logout(user.id);
    const response = NextResponse.json({ success: true });
    clearRefreshCookie(response);
    return response;
  } catch (error) {
    return authErrorResponse(error);
  }
}

