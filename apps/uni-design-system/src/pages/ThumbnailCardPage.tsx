import { PageHeader, PreviewBlock } from "@/components/PreviewBlock";
import { ThumbnailCard } from "@/components/ui/thumbnail-card";
import * as React from "react";

export function ThumbnailCardPage() {
  const [selected, setSelected] = React.useState<number | null>(0);

  return (
    <div>
      <PageHeader
        title="Thumbnail Card"
        description="Media tile. rounded-none, shadow-none. Selected state uses border-primary border-2."
      />
      <div className="space-y-6">
        <PreviewBlock title="With image placeholder (no-image icon)" className="items-start flex-wrap">
          {[0, 1, 2].map((i) => (
            <ThumbnailCard
              key={i}
              title={`Item ${i + 1}`}
              showNoImageIcon
              selected={selected === i}
              onClick={() => setSelected(i)}
            />
          ))}
        </PreviewBlock>

        <PreviewBlock title="With image (uses object-cover)" className="items-start flex-wrap">
          {["Landscape", "Portrait", "Square"].map((label, i) => (
            <ThumbnailCard
              key={label}
              thumbnail={`https://picsum.photos/seed/${i + 10}/300/200`}
              title={label}
              selected={selected === i + 10}
              onClick={() => setSelected(i + 10)}
            />
          ))}
        </PreviewBlock>

        <PreviewBlock title="Long title with scroll" className="items-start flex-wrap">
          <ThumbnailCard
            title="A very long title that should scroll inside the card when hovered because enableScroll is true by default"
            showNoImageIcon
          />
          <ThumbnailCard
            title="Short title"
            showNoImageIcon
          />
        </PreviewBlock>
      </div>
    </div>
  );
}
