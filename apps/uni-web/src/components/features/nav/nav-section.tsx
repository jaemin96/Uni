import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type NavSectionProps = {
  title: string;
  children: ReactNode;
  className?: string;
  collapsed?: boolean;
};

export function NavSection({ title, children, className, collapsed }: NavSectionProps) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <p className={`px-3 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground whitespace-nowrap overflow-hidden transition-all duration-200 ${collapsed ? "w-0 opacity-0 py-0 h-0" : "opacity-100"}`}>
        {title}
      </p>
      {children}
    </div>
  );
}
