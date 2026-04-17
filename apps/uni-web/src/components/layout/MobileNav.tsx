"use client";

import { useState } from "react";
import { Menu, LayoutDashboard, LogIn, Component } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { NavSection } from "@/components/features/nav/nav-section";
import { NavItem } from "@/components/features/nav/nav-item";
import { NAV_CONFIGS } from "../features/nav/nav-config";

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
              {NAV_CONFIGS?.map((config) => (
                <NavSection key={config?.section} title={config?.section}>
                  {config?.items?.map((item) => (
                    <NavItem key={item.href} href={item.href} label={item.label} icon={item.icon} />
                  ))}
                </NavSection>
              ))}
            </nav>
          </div>
        </SheetContent>
      </Sheet>

      <span className="text-base font-bold tracking-tight">Uni</span>
    </header>
  );
}
