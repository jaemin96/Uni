"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, LayoutDashboard, LogIn } from "lucide-react";
import { NavSection } from "@/components/features/nav/nav-section";
import { NavItem } from "@/components/features/nav/nav-item";

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    // hidden: 모바일/태블릿에서 DOM에서 완전 제거
    // lg:flex: 데스크톱에서만 표시
    // sticky top-0 h-svh: 스크롤 시 사이드바 고정
    <aside
      className={`
        hidden lg:flex flex-col gap-3
        sticky top-0 h-svh
        border-r bg-background py-6
        overflow-y-auto overflow-x-hidden
        shrink-0 transition-[width] duration-200 ease-in-out
        ${collapsed ? "w-16" : "w-[17.5rem]"}
      `}
    >
      <div className={`flex items-center px-3 ${collapsed ? "justify-center" : "justify-between"}`}>
        <span
          className={`text-lg font-bold tracking-tight whitespace-nowrap overflow-hidden transition-all duration-200 ${
            collapsed ? "w-0 opacity-0" : "w-auto opacity-100"
          }`}
        >
          Uni
        </span>
        <button
          onClick={() => setCollapsed((v) => !v)}
          className="flex h-6 w-6 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
          aria-label={collapsed ? "사이드바 펼치기" : "사이드바 접기"}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      <nav className="flex flex-col gap-2">
        <NavSection title="인증" collapsed={collapsed}>
          <NavItem href="/login" label="로그인" icon={LogIn} collapsed={collapsed} />
        </NavSection>
        <NavSection title="메인" collapsed={collapsed}>
          <NavItem
            href="/dashboard"
            label="대시보드"
            icon={LayoutDashboard}
            collapsed={collapsed}
          />
        </NavSection>
      </nav>
    </aside>
  );
}
