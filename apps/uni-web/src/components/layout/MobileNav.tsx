"use client";

import { useState } from "react";
import { Menu, LayoutDashboard, LogIn, Component } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { NavSection } from "@/components/features/nav/nav-section";
import { NavItem } from "@/components/features/nav/nav-item";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 flex lg:hidden items-center gap-3 border-b bg-background px-4 h-14">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button
            className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
            aria-label="메뉴 열기"
          >
            <Menu className="h-5 w-5" />
          </button>
        </SheetTrigger>

        <SheetContent side="left">
          <div className="flex flex-col gap-6 pt-10 px-3 pb-6 h-full overflow-y-auto">
            <SheetTitle className="px-0">Uni</SheetTitle>

            <nav className="flex flex-col gap-6" onClick={() => setOpen(false)}>
              <NavSection title="인증">
                <NavItem href="/login" label="로그인" icon={LogIn} />
              </NavSection>
              <NavSection title="Hooks">
                <NavItem href="/hooks/useRef" label="useRef" icon={Component} />
              </NavSection>
              <NavSection title="메인">
                <NavItem href="/dashboard" label="대시보드" icon={LayoutDashboard} />
              </NavSection>
            </nav>
          </div>
        </SheetContent>
      </Sheet>

      <span className="text-base font-bold tracking-tight">Uni</span>
    </header>
  );
}
