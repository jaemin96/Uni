import { NextResponse } from "next/server";
import { z } from "zod";

import { login } from "@mono/auth-core";

import { authErrorResponse, setRefreshCookie } from "../_shared";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export async function POST(request: Request) {
  try {
    const body = loginSchema.parse(await request.json());
    const result = await login(body);
    const response = NextResponse.json({
      accessToken: result.accessToken,
      user: result.user,
    });
    setRefreshCookie(response, result.refreshToken);
    return response;
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: "입력값이 올바르지 않습니다" }, { status: 400 });
    }

    return authErrorResponse(error);
  }
}

