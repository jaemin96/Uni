"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/lib/auth/auth-context";

function formatDate(date: Date) {
  return date.toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function truncateToken(token: string) {
  if (token.length <= 40) return token;
  return token.slice(0, 20) + "..." + token.slice(-20);
}

export function TokenStatusPanel() {
  const { tokenMeta, user } = useAuth();
  const [now, setNow] = useState(() => new Date());

  // Tick every second to keep expiry display live
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!tokenMeta || !user) {
    return (
      <Card className="border-dashed">
        <CardHeader>
          <CardTitle className="text-base text-muted-foreground">토큰 상태</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">로그인 후 토큰 정보가 표시됩니다.</p>
        </CardContent>
      </Card>
    );
  }

  const isExpired = now >= tokenMeta.accessExpiresAt;
  const remainingMs = tokenMeta.accessExpiresAt.getTime() - now.getTime();
  const remainingSec = Math.max(0, Math.floor(remainingMs / 1000));
  const remainingMin = Math.floor(remainingSec / 60);
  const remainingSecDisplay = remainingSec % 60;

  return (
    <div className="flex flex-col gap-4">
      {/* Access Token */}
      <Card className={isExpired ? "border-destructive" : "border-green-500"}>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Access Token</CardTitle>
            <span
              className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                isExpired
                  ? "bg-destructive/10 text-destructive"
                  : "bg-green-500/10 text-green-600 dark:text-green-400"
              }`}
            >
              {isExpired ? "만료됨" : "유효"}
            </span>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <p className="text-xs text-muted-foreground mb-1">토큰값</p>
            <code className="block text-xs bg-muted rounded px-2 py-1.5 break-all font-mono">
              {truncateToken(tokenMeta.accessToken)}
            </code>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">만료 예정일시</p>
              <p className="font-medium tabular-nums">{formatDate(tokenMeta.accessExpiresAt)}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">남은 시간</p>
              <p
                className={`font-mono font-semibold tabular-nums ${
                  isExpired
                    ? "text-destructive"
                    : remainingSec < 60
                      ? "text-orange-500"
                      : "text-green-600 dark:text-green-400"
                }`}
              >
                {isExpired
                  ? "만료"
                  : `${String(remainingMin).padStart(2, "0")}:${String(remainingSecDisplay).padStart(2, "0")}`}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Refresh Token */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Refresh Token</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <p className="text-xs text-muted-foreground mb-0.5">발급일시</p>
            <p className="text-sm font-medium">{formatDate(tokenMeta.refreshIssuedAt)}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-0.5">전략</p>
            <p className="text-sm text-muted-foreground">
              RTR (Refresh Token Rotation) — 재발급 시 기존 토큰 폐기 및 해킹 징후 감지
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-0.5">저장 방식</p>
            <p className="text-sm text-muted-foreground">HttpOnly Cookie (SameSite: Strict)</p>
          </div>
        </CardContent>
      </Card>

      {/* User Info */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">인증된 사용자</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">이메일</p>
              <p className="font-medium">{user.email}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">역할</p>
              <p className="font-medium">{user.role}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
