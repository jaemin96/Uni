import Link from "next/link";

import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  return (
    <main className="auth-shell">
      <div className="auth-card">
        <LoginForm />
        <p className="muted">
          계정이 없으면 <Link href="/signup">회원가입</Link>
        </p>
      </div>
    </main>
  );
}

