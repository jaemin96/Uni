import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";

export function Shell() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="ml-60 min-h-screen">
        <div className="max-w-4xl mx-auto px-8 py-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
