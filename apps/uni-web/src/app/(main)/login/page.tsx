import { Suspense } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LoginForm } from "@/components/auth/login-form";
import { TokenStatusPanel } from "@/components/auth/token-status-panel";
import { PageLayout } from "@/components/ui/page-layout";

export const metadata = {
  title: "로그인 | Uni",
};

export default function LoginPage() {
  return (
    <PageLayout title="로그인" description="JWT 인증 학습 페이지">
      <div className="flex flex-col gap-6 max-w-xl">
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
    </PageLayout>
  );
}
