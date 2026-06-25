import { Trash2 } from "lucide-react";
import { cn } from "../lib/cn";

type Tab = {
  id: string;
  label: string;
  icon: React.ReactNode;
};

const tabs: Tab[] = [{ id: "clean", label: "Clean", icon: <Trash2 size={16} /> }];

type SidebarProps = {
  activeTab: string;
  onTabChange: (tab: string) => void;
};

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <aside className="flex flex-col w-52 shrink-0 border-r border-[var(--border)] min-h-screen bg-[var(--bg)] py-6 px-3 gap-1">
      <div className="px-3 mb-4">
        <span className="text-xs font-semibold tracking-widest uppercase text-[var(--text)] opacity-50">
          uni-board
        </span>
      </div>
      {tabs.map((tab) => (
        <button
          type="button"
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors text-left",
            activeTab === tab.id
              ? "bg-[var(--accent-bg)] text-[var(--accent)] border border-[var(--accent-border)]"
              : "text-[var(--text)] hover:bg-[var(--code-bg)]"
          )}
        >
          {tab.icon}
          {tab.label}
        </button>
      ))}
    </aside>
  );
}
