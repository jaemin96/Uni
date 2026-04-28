import { PageHeader, PreviewBlock } from "@/components/PreviewBlock";
import { Separator } from "@/components/ui/separator";

export function SeparatorPage() {
  return (
    <div>
      <PageHeader
        title="Separator"
        description="1px bg-border line. Horizontal or vertical."
      />
      <div className="space-y-6">
        <PreviewBlock title="Horizontal" className="flex-col items-stretch gap-4">
          <div className="space-y-4">
            <p className="text-sm font-medium">Above the line</p>
            <Separator />
            <p className="text-sm text-muted-foreground">Below the line</p>
          </div>
        </PreviewBlock>

        <PreviewBlock title="Vertical" className="h-16 items-center gap-4">
          <span className="text-sm">Left</span>
          <Separator orientation="vertical" />
          <span className="text-sm">Right</span>
          <Separator orientation="vertical" />
          <span className="text-sm">Far right</span>
        </PreviewBlock>

        <PreviewBlock title="In a menu list" className="flex-col items-stretch gap-1">
          {["Edit", "Copy", "Paste"].map((item) => (
            <button key={item} className="text-left text-sm px-3 py-2 rounded-md hover:bg-accent transition-colors">
              {item}
            </button>
          ))}
          <Separator className="my-1" />
          {["Delete"].map((item) => (
            <button key={item} className="text-left text-sm px-3 py-2 rounded-md hover:bg-accent text-destructive transition-colors">
              {item}
            </button>
          ))}
        </PreviewBlock>
      </div>
    </div>
  );
}
