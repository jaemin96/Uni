import { PageHeader, PreviewBlock } from "@/components/PreviewBlock";
import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonPage() {
  return (
    <div>
      <PageHeader
        title="Skeleton"
        description="animate-pulse rounded-md bg-accent placeholder."
      />
      <div className="space-y-6">
        <PreviewBlock title="Basic blocks" className="flex-col items-stretch gap-3">
          <Skeleton className="h-4 w-64" />
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-4 w-80" />
        </PreviewBlock>

        <PreviewBlock title="Card skeleton" className="items-start">
          <div className="w-72 space-y-3">
            <Skeleton className="h-36 w-full rounded-xl" />
            <div className="space-y-2 px-1">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </div>
        </PreviewBlock>

        <PreviewBlock title="Profile skeleton" className="items-center gap-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-24" />
          </div>
        </PreviewBlock>
      </div>
    </div>
  );
}
