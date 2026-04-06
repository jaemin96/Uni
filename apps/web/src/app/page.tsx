import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <section className="hero">
        <div className="hero-card">
          <p className="muted">JWT Auth Monorepo</p>
          <h1>Access Token은 메모리에, Refresh Token은 HttpOnly 쿠키에 둡니다.</h1>
          <p className="muted">
            Next.js Route Handler와 NestJS GraphQL 서버 양쪽에서 같은 인증 코어를 공유합니다.
          </p>
          <div className="actions">
            <Link href="/login">로그인</Link>
            <Link href="/signup">회원가입</Link>
          </div>
        </div>
      </section>
    </main>
  );
}

