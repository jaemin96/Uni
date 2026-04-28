import { PageHeader, PreviewBlock } from "@/components/PreviewBlock";
import { Spinner } from "@/components/ui/spinner";

export function SpinnerPage() {
  return (
    <div>
      <PageHeader
        title="Spinner"
        description="3 sizes × 3 colors = 9 variants. animate-spin border-based."
      />
      <div className="space-y-6">
        <PreviewBlock title="Sizes (gray)" className="items-center gap-6">
          <div className="flex flex-col items-center gap-2">
            <Spinner size="sm" color="gray" />
            <span className="text-xs text-muted-foreground">sm</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Spinner size="md" color="gray" />
            <span className="text-xs text-muted-foreground">md</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Spinner size="lg" color="gray" />
            <span className="text-xs text-muted-foreground">lg</span>
          </div>
        </PreviewBlock>

        <PreviewBlock title="Colors (md)" className="items-center gap-6">
          <div className="flex flex-col items-center gap-2">
            <Spinner size="md" color="gray" />
            <span className="text-xs text-muted-foreground">gray</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Spinner size="md" color="blue" />
            <span className="text-xs text-muted-foreground">blue</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Spinner size="md" color="red" />
            <span className="text-xs text-muted-foreground">red</span>
          </div>
        </PreviewBlock>
      </div>
    </div>
  );
}
