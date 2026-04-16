import type { ReactNode } from "react";
import { PageHeader } from "./page-header";

type PageLayoutProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

export function PageLayout({ title, description, children }: PageLayoutProps) {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader title={title} description={description} />
      <div>{children}</div>
    </div>
  );
}
