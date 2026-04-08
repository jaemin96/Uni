import { NextRequest, NextResponse } from "next/server";
import { REFRESH_COOKIE_NAME, getClearCookieOptions } from "@/lib/auth/cookies";

export async function POST(_req: NextRequest) {
  const response = NextResponse.json({ success: true });
  response.cookies.set(REFRESH_COOKIE_NAME, "", getClearCookieOptions());
  return response;
}
