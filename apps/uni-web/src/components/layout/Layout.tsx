import type { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";

type LayoutProps = {
  children: ReactNode;
};

export function AppLayout({ children }: LayoutProps) {
  return (
    // 전체 래퍼: 데스크톱에서 flex row, 모바일에서 flex col
    <div className="flex min-h-screen bg-background">
      {/* 데스크톱(lg+): 좌측 sticky 사이드바 — 모바일에서 완전히 제거됨(hidden) */}
      <Sidebar />

      {/* 우측 컨텐츠 영역 */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* 모바일/태블릿(<lg): sticky 상단 헤더 — 데스크톱에서 숨김(lg:hidden) */}
        <MobileNav />

        {/* 컨텐츠: 모바일은 헤더 아래 스크롤, 데스크톱은 사이드바 옆 스크롤 */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
