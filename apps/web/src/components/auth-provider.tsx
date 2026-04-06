"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { useRefreshSession } from "@/hooks/use-auth";
import { useAuthStore } from "@/stores/auth";

function AuthBootstrap({ children }: { children: React.ReactNode }) {
  const hydrated = useAuthStore((state) => state.hydrated);
  const setHydrated = useAuthStore((state) => state.setHydrated);
  const { mutateAsync } = useRefreshSession();

  useEffect(() => {
    let cancelled = false;

    async function restoreSession() {
      try {
        await mutateAsync();
      } finally {
        if (!cancelled) {
          setHydrated(true);
        }
      }
    }

    void restoreSession();

    return () => {
      cancelled = true;
    };
  }, [mutateAsync, setHydrated]);

  if (!hydrated) {
    return <div style={{ padding: 24 }}>세션 확인 중...</div>;
  }

  return <>{children}</>;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <AuthBootstrap>{children}</AuthBootstrap>
    </QueryClientProvider>
  );
}
