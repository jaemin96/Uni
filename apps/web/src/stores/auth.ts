"use client";

import { create } from "zustand";

import type { AuthUser } from "@/types/auth";

interface AuthState {
  accessToken: string | null;
  user: AuthUser | null;
  hydrated: boolean;
  setAuth: (accessToken: string, user: AuthUser) => void;
  clearAuth: () => void;
  setHydrated: (hydrated: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  user: null,
  hydrated: false,
  setAuth: (accessToken, user) => set({ accessToken, user }),
  clearAuth: () => set({ accessToken: null, user: null }),
  setHydrated: (hydrated) => set({ hydrated }),
}));

