"use client";

import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import type { AuthUser, AuthTokens } from "./types";

export type TokenMeta = {
  accessToken: string;
  accessExpiresAt: Date; // absolute expiry time
  refreshIssuedAt: Date; // when the refresh token was issued
};

interface AuthState {
  user: AuthUser | null;
  tokenMeta: TokenMeta | null;
  isLoading: boolean;
}

interface AuthContextValue extends AuthState {
  login: (tokens: AuthTokens & { user: AuthUser; refreshIssuedAt?: Date }) => void;
  logout: () => Promise<void>;
  getAccessToken: () => string | null;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const SILENT_REFRESH_OFFSET_MS = 60 * 1000;

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    tokenMeta: null,
    isLoading: true,
  });

  const refreshTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const accessTokenRef = useRef<string | null>(null);
  // Track when the current refresh token was issued (approximated from last login/refresh)
  const refreshIssuedAtRef = useRef<Date>(new Date());

  const scheduleRefresh = useCallback((expiresInSeconds: number) => {
    if (refreshTimerRef.current) clearTimeout(refreshTimerRef.current);
    const delay = Math.max(0, expiresInSeconds * 1000 - SILENT_REFRESH_OFFSET_MS);
    refreshTimerRef.current = setTimeout(() => {
      silentRefresh();
    }, delay);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const silentRefresh = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/refresh", { method: "POST", credentials: "include" });
      if (!res.ok) {
        setState({ user: null, tokenMeta: null, isLoading: false });
        accessTokenRef.current = null;
        return;
      }
      const data: AuthTokens = await res.json();
      const now = new Date();
      refreshIssuedAtRef.current = now;
      accessTokenRef.current = data.accessToken;
      setState((prev) => ({
        ...prev,
        tokenMeta: {
          accessToken: data.accessToken,
          accessExpiresAt: new Date(now.getTime() + data.expiresIn * 1000),
          refreshIssuedAt: now,
        },
        isLoading: false,
      }));
      scheduleRefresh(data.expiresIn);
    } catch {
      setState({ user: null, tokenMeta: null, isLoading: false });
      accessTokenRef.current = null;
    }
  }, [scheduleRefresh]);

  useEffect(() => {
    silentRefresh();
    return () => {
      if (refreshTimerRef.current) clearTimeout(refreshTimerRef.current);
    };
  }, [silentRefresh]);

  const login = useCallback(
    (data: AuthTokens & { user: AuthUser; refreshIssuedAt?: Date }) => {
      const now = new Date();
      const refreshIssuedAt = data.refreshIssuedAt ?? now;
      refreshIssuedAtRef.current = refreshIssuedAt;
      accessTokenRef.current = data.accessToken;
      setState({
        user: data.user,
        tokenMeta: {
          accessToken: data.accessToken,
          accessExpiresAt: new Date(now.getTime() + data.expiresIn * 1000),
          refreshIssuedAt,
        },
        isLoading: false,
      });
      scheduleRefresh(data.expiresIn);
    },
    [scheduleRefresh],
  );

  const logout = useCallback(async () => {
    if (refreshTimerRef.current) clearTimeout(refreshTimerRef.current);
    await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    accessTokenRef.current = null;
    setState({ user: null, tokenMeta: null, isLoading: false });
  }, []);

  const getAccessToken = useCallback(() => accessTokenRef.current, []);

  return (
    <AuthContext.Provider value={{ ...state, login, logout, getAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
