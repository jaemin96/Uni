import { PageHeader, PreviewBlock } from "@/components/PreviewBlock";

const tokens = [
  { name: "background", label: "background", fg: "foreground" },
  { name: "card", label: "card", fg: "card-foreground" },
  { name: "primary", label: "primary", fg: "primary-foreground" },
  { name: "secondary", label: "secondary", fg: "secondary-foreground" },
  { name: "muted", label: "muted", fg: "muted-foreground" },
  { name: "accent", label: "accent", fg: "accent-foreground" },
  { name: "destructive", label: "destructive", fg: "destructive-foreground" },
];

export function ColorsPage() {
  return (
    <div>
      <PageHeader
        title="Colors"
        description="Semantic zinc token pairs. Every surface has a matching *-foreground."
      />
      <div className="space-y-6">
        <PreviewBlock title="Semantic tokens" className="flex-col items-stretch gap-2">
          {tokens.map(({ name, label, fg }) => (
            <div
              key={name}
              className={`flex items-center justify-between rounded-md px-4 py-3 border bg-${name} text-${fg}`}
            >
              <span className="text-sm font-medium">--{label}</span>
              <span className="text-xs opacity-70 font-mono">bg-{name} / text-{fg}</span>
            </div>
          ))}
        </PreviewBlock>

        <PreviewBlock title="Border & ring" className="flex-col items-stretch gap-2">
          <div className="rounded-md border px-4 py-3 text-sm">
            <span className="text-muted-foreground font-mono">border</span>
            <span className="ml-4 text-foreground">1px border using --border</span>
          </div>
          <div className="rounded-md px-4 py-3 text-sm ring-1 ring-ring">
            <span className="text-muted-foreground font-mono">ring</span>
            <span className="ml-4 text-foreground">focus ring using --ring</span>
          </div>
        </PreviewBlock>

        <PreviewBlock title="Sidebar tokens" className="flex-col items-stretch gap-2">
          {[
            { bg: "sidebar-background", text: "sidebar-foreground", label: "sidebar-background" },
            { bg: "sidebar-accent", text: "sidebar-accent-foreground", label: "sidebar-accent" },
          ].map(({ bg, text, label }) => (
            <div key={label} className={`flex items-center justify-between rounded-md px-4 py-3 border bg-${bg} text-${text}`}>
              <span className="text-sm font-medium">--{label}</span>
              <span className="text-xs opacity-70 font-mono">bg-{bg}</span>
            </div>
          ))}
        </PreviewBlock>

        <PreviewBlock title="Radius scale" className="items-end gap-4">
          {[
            { label: "sm", cls: "rounded-sm" },
            { label: "md", cls: "rounded-md" },
            { label: "lg", cls: "rounded-lg" },
            { label: "xl", cls: "rounded-xl" },
            { label: "full", cls: "rounded-full" },
          ].map(({ label, cls }) => (
            <div key={label} className="flex flex-col items-center gap-1.5">
              <div className={`w-10 h-10 border-2 border-primary bg-secondary ${cls}`} />
              <span className="text-xs text-muted-foreground font-mono">{label}</span>
            </div>
          ))}
        </PreviewBlock>
      </div>
    </div>
  );
}
