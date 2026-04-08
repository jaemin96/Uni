"use client";

import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import type { AuthUser, AuthTokens } from "./types";

interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  isLoading: boolean;
}

interface AuthContextValue extends AuthState {
  login: (tokens: AuthTokens & { user: AuthUser }) => void;
  logout: () => Promise<void>;
  getAccessToken: () => string | null;
}

const AuthContext = createContext<AuthContextValue | null>(null);

// Silent refresh interval: 1 minute before token expiry (access token = 15min, so every 14min)
const SILENT_REFRESH_OFFSET_MS = 60 * 1000;

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    accessToken: null,
    isLoading: true,
  });

  const refreshTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const accessTokenRef = useRef<string | null>(null);

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
        setState({ user: null, accessToken: null, isLoading: false });
        accessTokenRef.current = null;
        return;
      }
      const data: AuthTokens = await res.json();
      accessTokenRef.current = data.accessToken;
      setState((prev) => ({ ...prev, accessToken: data.accessToken, isLoading: false }));
      scheduleRefresh(data.expiresIn);
    } catch {
      setState({ user: null, accessToken: null, isLoading: false });
      accessTokenRef.current = null;
    }
  }, [scheduleRefresh]);

  // On mount, attempt silent refresh to restore session from httpOnly refresh token cookie
  useEffect(() => {
    silentRefresh();
    return () => {
      if (refreshTimerRef.current) clearTimeout(refreshTimerRef.current);
    };
  }, [silentRefresh]);

  const login = useCallback(
    (data: AuthTokens & { user: AuthUser }) => {
      accessTokenRef.current = data.accessToken;
      setState({ user: data.user, accessToken: data.accessToken, isLoading: false });
      scheduleRefresh(data.expiresIn);
    },
    [scheduleRefresh],
  );

  const logout = useCallback(async () => {
    if (refreshTimerRef.current) clearTimeout(refreshTimerRef.current);
    await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    accessTokenRef.current = null;
    setState({ user: null, accessToken: null, isLoading: false });
  }, []);

  // Expose ref-based getter to avoid stale closures in fetch interceptors
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
