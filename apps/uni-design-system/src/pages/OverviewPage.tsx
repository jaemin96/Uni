import { PageHeader } from "@/components/PreviewBlock";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const components = [
  { name: "Button", variants: "default · destructive · outline · secondary · ghost · link", count: 6 },
  { name: "Badge", variants: "default · secondary · destructive · outline", count: 4 },
  { name: "Card", variants: "Header · Title · Description · Content · Footer", count: 5 },
  { name: "Input", variants: "text · password (with reveal toggle)", count: 2 },
  { name: "Separator", variants: "horizontal · vertical", count: 2 },
  { name: "Skeleton", variants: "block placeholder", count: 1 },
  { name: "Spinner", variants: "sm/md/lg × gray/blue/red", count: 9 },
  { name: "Tabs", variants: "List · Trigger · Content", count: 3 },
  { name: "Typography", variants: "H1–H4 · P · Lead · Large · Small · Muted · Blockquote · Code", count: 10 },
  { name: "Thumbnail Card", variants: "with image · no image · selected", count: 3 },
  { name: "Page Title", variants: "with icon · without icon", count: 2 },
  { name: "Section Title", variants: "with icon · without icon", count: 2 },
];

export function OverviewPage() {
  return (
    <div>
      <PageHeader
        title="Weaw Design System"
        description="shadcn/ui · New-York style · zinc base · Tailwind CSS v4 · Radix UI · Lucide icons"
      />

      <div className="space-y-6">
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Components", value: "12" },
            { label: "Base color", value: "zinc" },
            { label: "Style", value: "new-york" },
          ].map(({ label, value }) => (
            <Card key={label}>
              <CardContent className="pt-6">
                <p className="text-2xl font-extrabold tracking-tight">{value}</p>
                <p className="text-xs text-muted-foreground mt-1">{label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Separator />

        <div>
          <h2 className="text-sm font-semibold mb-3">Component index</h2>
          <div className="grid grid-cols-2 gap-2">
            {components.map((c) => (
              <Card key={c.name} className="shadow-none">
                <CardHeader className="p-4 pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm">{c.name}</CardTitle>
                    <Badge variant="secondary" className="text-xs font-mono">{c.count}</Badge>
                  </div>
                  <CardDescription className="text-xs">{c.variants}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        <Separator />

        <div>
          <h2 className="text-sm font-semibold mb-3">Stack</h2>
          <div className="flex flex-wrap gap-2">
            {["React 19", "Vite", "TypeScript strict", "Tailwind CSS v4", "shadcn/ui", "Radix UI", "Lucide", "CVA", "clsx + tailwind-merge"].map((t) => (
              <Badge key={t} variant="outline">{t}</Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
