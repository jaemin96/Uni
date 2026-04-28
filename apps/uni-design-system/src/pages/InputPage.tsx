import { PageHeader, PreviewBlock } from "@/components/PreviewBlock";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function InputPage() {
  return (
    <div>
      <PageHeader
        title="Input"
        description="h-9 rounded-md. Password type includes built-in reveal toggle."
      />
      <div className="space-y-6">
        <PreviewBlock title="Default" className="flex-col items-stretch gap-3">
          <div className="w-80 space-y-1.5">
            <Label htmlFor="text-input">Label</Label>
            <Input id="text-input" type="text" placeholder="Placeholder text" />
          </div>
        </PreviewBlock>

        <PreviewBlock title="Password with reveal toggle" className="flex-col items-stretch gap-3">
          <div className="w-80 space-y-1.5">
            <Label htmlFor="password-input">Password</Label>
            <Input id="password-input" type="password" placeholder="Enter password" />
          </div>
        </PreviewBlock>

        <PreviewBlock title="States" className="flex-col items-stretch gap-3">
          <div className="w-80 space-y-1.5">
            <Label>Disabled</Label>
            <Input type="text" placeholder="Disabled input" disabled />
          </div>
          <div className="w-80 space-y-1.5">
            <Label>With value</Label>
            <Input type="text" defaultValue="jaemin@example.com" />
          </div>
          <div className="w-80 space-y-1.5">
            <Label>Email</Label>
            <Input type="email" placeholder="you@example.com" />
          </div>
        </PreviewBlock>
      </div>
    </div>
  );
}
