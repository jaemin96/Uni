import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

type PageTitleProps = {
  label: string;
  icon?: LucideIcon;
  className?: string;
};

export function PageTitle({ label, icon: Icon, className }: PageTitleProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center text-center w-full gap-3 text-3xl font-semibold text-foreground mb-6 mt-6",
        className
      )}
    >
      {Icon && <Icon className="w-6 h-6 text-muted-foreground" />}
      <h1>{label}</h1>
    </div>
  );
}

type SectionTitleProps = {
  label: string;
  icon?: LucideIcon;
  className?: string;
};

export function SectionTitle({ label, icon: Icon, className }: SectionTitleProps) {
  return (
    <div className={cn("flex items-center gap-3 text-xl font-semibold text-foreground", className)}>
      {Icon && <Icon className="w-5 h-5 text-muted-foreground" />}
      <h2 className="text-2xl font-semibold">{label}</h2>
    </div>
  );
}
