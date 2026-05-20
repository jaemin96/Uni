import { NavLink } from "react-router-dom";
import { cn } from "@uni/utils";
import {
  MousePointer2,
  Square,
  Tag,
  Type,
  Minus,
  AlignLeft,
  LayoutGrid,
  Layers,
  Image,
  Loader2,
  Palette,
  ScanText,
  Heading,
} from "lucide-react";

const navItems = [
  { path: "/", label: "Overview", icon: Layers },
  { path: "/colors", label: "Colors", icon: Palette },
  { path: "/typography", label: "Typography", icon: Type },
  { path: "/button", label: "Button", icon: MousePointer2 },
  { path: "/badge", label: "Badge", icon: Tag },
  { path: "/card", label: "Card", icon: Square },
  { path: "/input", label: "Input", icon: AlignLeft },
  { path: "/separator", label: "Separator", icon: Minus },
  { path: "/skeleton", label: "Skeleton", icon: LayoutGrid },
  { path: "/spinner", label: "Spinner", icon: Loader2 },
  { path: "/tabs", label: "Tabs", icon: ScanText },
  { path: "/thumbnail-card", label: "Thumbnail Card", icon: Image },
  { path: "/title", label: "Title", icon: Heading },
];

export function Sidebar() {
  return (
    <aside className="fixed top-0 left-0 h-full w-60 border-r bg-sidebar-background flex flex-col">
      <div className="h-16 flex items-center px-6 border-b">
        <span className="font-extrabold text-lg tracking-tight">Weaw</span>
        <span className="ml-2 text-xs text-muted-foreground font-medium">Design System</span>
      </div>
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <p className="px-3 mb-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Components
        </p>
        <ul className="space-y-0.5">
          {navItems.map(({ path, label, icon: Icon }) => (
            <li key={path}>
              <NavLink
                to={path}
                end={path === "/"}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-colors",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  )
                }
              >
                <Icon size={15} />
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="px-6 py-4 border-t">
        <p className="text-xs text-muted-foreground">shadcn/ui · new-york · zinc</p>
      </div>
    </aside>
  );
}
