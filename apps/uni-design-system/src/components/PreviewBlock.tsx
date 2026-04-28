import * as React from "react";
import { cn } from "@/lib/utils";

type PreviewBlockProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
};

export function PreviewBlock({ title, description, children, className }: PreviewBlockProps) {
  return (
    <section className="space-y-3">
      <div>
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        {description && <p className="text-xs text-muted-foreground mt-0.5">{description}</p>}
      </div>
      <div
        className={cn(
          "rounded-lg border bg-card p-6 flex flex-wrap items-center gap-3",
          className
        )}
      >
        {children}
      </div>
    </section>
  );
}

type PageHeaderProps = {
  title: string;
  description?: string;
};

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="mb-8 pb-6 border-b">
      <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
      {description && <p className="mt-1.5 text-sm text-muted-foreground">{description}</p>}
    </div>
  );
}
