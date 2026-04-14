import { Suspense } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LoginForm } from "@/components/auth/login-form";
import { TokenStatusPanel } from "@/components/auth/token-status-panel";

export const metadata = {
  title: "로그인 | Uni",
};

export default function LoginPage() {
  return (
    <div className="flex flex-col gap-6 max-w-xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">로그인</h1>
        <p className="text-sm text-muted-foreground mt-1">JWT 인증 학습 페이지</p>
      </div>

      <Card>
        <CardHeader className="space-y-1">
          <CardTitle>계정 로그인</CardTitle>
          <CardDescription>이메일과 비밀번호를 입력하세요 (자동 기입됨)</CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense>
            <LoginForm />
          </Suspense>
        </CardContent>
      </Card>

      <TokenStatusPanel />
    </div>
  );
}
