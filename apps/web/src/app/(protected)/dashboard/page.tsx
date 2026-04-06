import { getServerUser } from "@/lib/server-auth";

export default async function DashboardPage() {
  const user = await getServerUser();

  return (
    <main className="dashboard-shell">
      <section className="dashboard-card">
        <p className="muted">Protected Route</p>
        <h1>{user.nickname}님, 환영합니다.</h1>
        <p>이메일: {user.email}</p>
        <p>사용자 ID: {user.id}</p>
      </section>
    </main>
  );
}

