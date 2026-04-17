import { LayoutDashboard, LogIn, LucideIcon, ShoppingCart } from "lucide-react";

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

type NavConfig = {
  section: string;
  items: NavItem[];
};

export const NAV_CONFIGS: NavConfig[] = [
  {
    section: "auth",
    items: [{ href: "/login", label: "로그인", icon: LogIn }],
  },
  {
    section: "dashboard",
    items: [{ href: "/dashboard", label: "대시보드", icon: LayoutDashboard }],
  },
  {
    section: "performance",
    items: [{ href: "/performance/cart", label: "장바구니", icon: ShoppingCart }],
  },
];
