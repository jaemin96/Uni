import { PageHeader, PreviewBlock } from "@/components/PreviewBlock";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

export function ButtonPage() {
  return (
    <div>
      <PageHeader
        title="Button"
        description="6 variants × 4 sizes. Built on Radix Slot for polymorphic rendering."
      />
      <div className="space-y-6">
        <PreviewBlock title="Variants">
          <Button variant="default">Default</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </PreviewBlock>

        <PreviewBlock title="Sizes">
          <Button size="lg">Large</Button>
          <Button size="default">Default</Button>
          <Button size="sm">Small</Button>
          <Button size="icon" aria-label="add"><Plus /></Button>
        </PreviewBlock>

        <PreviewBlock title="With icon">
          <Button><Plus /> New item</Button>
          <Button variant="destructive"><Trash2 /> Delete</Button>
          <Button variant="outline"><Plus /> Create</Button>
        </PreviewBlock>

        <PreviewBlock title="Disabled state">
          <Button disabled>Default</Button>
          <Button variant="destructive" disabled>Destructive</Button>
          <Button variant="outline" disabled>Outline</Button>
          <Button variant="secondary" disabled>Secondary</Button>
        </PreviewBlock>
      </div>
    </div>
  );
}
