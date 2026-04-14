import { NextRequest, NextResponse } from "next/server";
import { verifyRefreshToken, signAccessToken, signRefreshToken } from "@/lib/auth/token";
import { REFRESH_COOKIE_NAME, getRefreshCookieOptions } from "@/lib/auth/cookies";

async function findUserById(id: string) {
  if (id === "usr_01") {
    return { id, email: "dev@test.com", role: "user" };
  }
  return null;
}

export async function POST(req: NextRequest) {
  const token = req.cookies.get(REFRESH_COOKIE_NAME)?.value;

  if (!token) {
    return NextResponse.json({ error: "No refresh token" }, { status: 401 });
  }

  const payload = await verifyRefreshToken(token);
  if (!payload) {
    return NextResponse.json({ error: "Invalid or expired refresh token" }, { status: 401 });
  }

  const user = await findUserById(payload.sub);
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 401 });
  }

  // Rotate refresh token on every use (prevents refresh token reuse attacks)
  const [accessToken, newRefreshToken] = await Promise.all([
    signAccessToken({ sub: user.id, email: user.email, role: user.role }),
    signRefreshToken(user.id),
  ]);

  const response = NextResponse.json({
    accessToken,
    expiresIn: 10 * 60,
  });

  response.cookies.set(REFRESH_COOKIE_NAME, newRefreshToken, getRefreshCookieOptions());

  return response;
}
