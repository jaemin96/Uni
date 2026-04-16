"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

type NavItemProps = {
  href: string;
  label: string;
  icon?: LucideIcon;
  collapsed?: boolean;
};

export function NavItem({ href, label, icon: Icon, collapsed }: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(href + "/");

  return (
    <Link
      href={href}
      title={collapsed ? label : undefined}
      className={cn(
        "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
        "hover:bg-accent hover:text-accent-foreground",
        collapsed && "justify-center px-2",
        isActive ? "bg-accent text-accent-foreground font-medium" : "text-muted-foreground",
      )}
    >
      {Icon && <Icon className="h-4 w-4 shrink-0" />}
      <span
        className={`whitespace-nowrap overflow-hidden transition-all duration-200 ${collapsed ? "w-0 opacity-0" : "opacity-100"}`}
      >
        {label}
      </span>
    </Link>
  );
}
