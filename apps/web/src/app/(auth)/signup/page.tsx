import Link from "next/link";

import { SignupForm } from "@/components/signup-form";

export default function SignupPage() {
  return (
    <main className="auth-shell">
      <div className="auth-card">
        <SignupForm />
        <p className="muted">
          이미 계정이 있으면 <Link href="/login">로그인</Link>
        </p>
      </div>
    </main>
  );
}

