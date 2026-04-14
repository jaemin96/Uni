import { SideNav } from "@/components/features/nav/side-nav";
import type { ReactNode } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <SideNav />
      <main className="flex-1 overflow-y-auto p-6">{children}</main>
    </div>
  );
}
