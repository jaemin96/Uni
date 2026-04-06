import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { getUserFromRefreshToken } from "@mono/auth-core";

export async function getServerUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("refresh_token")?.value;

  if (!token) {
    redirect("/login");
  }

  try {
    return await getUserFromRefreshToken(token);
  } catch {
    redirect("/login");
  }
}
