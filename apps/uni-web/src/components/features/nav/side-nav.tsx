"use client";

import { useState } from "react";
import { LayoutDashboard, LogIn, ChevronLeft, ChevronRight, Component } from "lucide-react";
import { NavSection } from "./nav-section";
import { NavItem } from "./nav-item";

export function SideNav() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <nav
      className={`relative flex h-full flex-col gap-6 border-r bg-background py-6 overflow-hidden transition-[width] duration-200 ease-in-out ${collapsed ? "w-16" : "w-60"}`}
    >
      <div className="flex items-center justify-between px-3">
        <span
          className={`text-lg font-bold tracking-tight whitespace-nowrap overflow-hidden transition-all duration-200 ${collapsed ? "w-0 opacity-0" : "w-auto opacity-100"}`}
        >
          Uni
        </span>
        <button
          onClick={() => setCollapsed((v) => !v)}
          className="ml-auto flex h-6 w-6 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      <div className="flex flex-col gap-6">
        <NavSection title="인증" collapsed={collapsed}>
          <NavItem href="/login" label="로그인" icon={LogIn} collapsed={collapsed} />
        </NavSection>
        <NavSection title="Hooks" collapsed={collapsed}>
          <NavItem href="/hooks/useRef" label="useRef" icon={Component} collapsed={collapsed} />
        </NavSection>
        <NavSection title="메인" collapsed={collapsed}>
          <NavItem
            href="/dashboard"
            label="대시보드"
            icon={LayoutDashboard}
            collapsed={collapsed}
          />
        </NavSection>
      </div>
    </nav>
  );
}
