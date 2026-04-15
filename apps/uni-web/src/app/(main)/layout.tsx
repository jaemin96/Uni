import { AppLayout } from "@/components/layout/Layout";
import type { ReactNode } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
  return <AppLayout>{children}</AppLayout>;
}
