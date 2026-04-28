import { PageHeader, PreviewBlock } from "@/components/PreviewBlock";
import { Badge } from "@/components/ui/badge";

export function BadgePage() {
  return (
    <div>
      <PageHeader title="Badge" description="4 variants. Inline status labels." />
      <div className="space-y-6">
        <PreviewBlock title="Variants">
          <Badge variant="default">Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="outline">Outline</Badge>
        </PreviewBlock>

        <PreviewBlock title="Usage examples">
          <Badge variant="default">New</Badge>
          <Badge variant="secondary">Beta</Badge>
          <Badge variant="outline">v1.0.0</Badge>
          <Badge variant="destructive">Error</Badge>
          <Badge variant="secondary">Pending</Badge>
          <Badge variant="outline">Open</Badge>
        </PreviewBlock>
      </div>
    </div>
  );
}
