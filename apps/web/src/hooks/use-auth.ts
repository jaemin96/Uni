"use client";

import { useMutation } from "@tanstack/react-query";

import { useAuthStore } from "@/stores/auth";
import type { AuthResponse } from "@/types/auth";

async function postJson<TBody extends object>(url: string, body?: TBody) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    credentials: "include",
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const payload = (await response.json().catch(() => ({}))) as { message?: string };
    throw new Error(payload.message ?? "요청 처리에 실패했습니다");
  }

  return (await response.json()) as AuthResponse | { success: true };
}

export function useSignup() {
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: (payload: { email: string; password: string; nickname: string }) =>
      postJson("/api/auth/signup", payload) as Promise<AuthResponse>,
    onSuccess: (result) => {
      setAuth(result.accessToken, result.user);
    },
  });
}

export function useLogin() {
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: (payload: { email: string; password: string }) =>
      postJson("/api/auth/login", payload) as Promise<AuthResponse>,
    onSuccess: (result) => {
      setAuth(result.accessToken, result.user);
    },
  });
}

export function useRefreshSession() {
  const setAuth = useAuthStore((state) => state.setAuth);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  return useMutation({
    mutationFn: () => postJson("/api/auth/refresh") as Promise<AuthResponse>,
    onSuccess: (result) => {
      setAuth(result.accessToken, result.user);
    },
    onError: () => {
      clearAuth();
    },
  });
}

export function useLogout() {
  const clearAuth = useAuthStore((state) => state.clearAuth);

  return useMutation({
    mutationFn: async () => {
      const token = useAuthStore.getState().accessToken;
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
        headers: token
          ? {
              authorization: `Bearer ${token}`,
            }
          : undefined,
      });

      if (!response.ok) {
        throw new Error("로그아웃에 실패했습니다");
      }

      return (await response.json()) as { success: true };
    },
    onSettled: () => {
      clearAuth();
    },
  });
}

