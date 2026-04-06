"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { useSignup } from "@/hooks/use-auth";

export function SignupForm() {
  const router = useRouter();
  const mutation = useSignup();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await mutation.mutateAsync({ email, password, nickname });
    router.push("/dashboard");
  }

  return (
    <form onSubmit={onSubmit} className="auth-card">
      <h1>회원가입</h1>
      <label>
        이메일
        <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
      </label>
      <label>
        닉네임
        <input value={nickname} onChange={(event) => setNickname(event.target.value)} required />
      </label>
      <label>
        비밀번호
        <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
      </label>
      {mutation.error ? <p className="error">{mutation.error.message}</p> : null}
      <button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? "처리 중..." : "회원가입"}
      </button>
    </form>
  );
}

