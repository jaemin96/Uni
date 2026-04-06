import { NextResponse } from "next/server";

import { requireAccessUser } from "../_shared";

export async function GET(request: Request) {
  const user = await requireAccessUser(request);

  if (!user) {
    return NextResponse.json({ message: "인증이 필요합니다" }, { status: 401 });
  }

  return NextResponse.json({
    user: {
      id: user.id,
      email: user.email,
      nickname: user.nickname,
      createdAt: user.createdAt,
    },
  });
}
