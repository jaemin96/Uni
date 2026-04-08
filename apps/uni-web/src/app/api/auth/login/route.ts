import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { signAccessToken, signRefreshToken } from "@/lib/auth/token";
import { REFRESH_COOKIE_NAME, getRefreshCookieOptions } from "@/lib/auth/cookies";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

// TODO: Replace with real DB lookup
async function findUserByCredentials(email: string, password: string) {
  // Mock user for development — swap with real DB query
  if (email === "admin@uni.dev" && password === "password1234") {
    return { id: "usr_01", email, role: "admin" };
  }
  return null;
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);

  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { email, password } = parsed.data;
  const user = await findUserByCredentials(email, password);

  if (!user) {
    // Constant-time response to prevent user enumeration
    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
  }

  const [accessToken, refreshToken] = await Promise.all([
    signAccessToken({ sub: user.id, email: user.email, role: user.role }),
    signRefreshToken(user.id),
  ]);

  const response = NextResponse.json({
    accessToken,
    expiresIn: 15 * 60, // 15 minutes in seconds
    user: { id: user.id, email: user.email, role: user.role },
  });

  response.cookies.set(REFRESH_COOKIE_NAME, refreshToken, getRefreshCookieOptions());

  return response;
}
