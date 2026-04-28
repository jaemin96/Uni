import { PageHeader, PreviewBlock } from "@/components/PreviewBlock";
import {
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
  TypographyP,
  TypographyLead,
  TypographyLarge,
  TypographySmall,
  TypographyMuted,
  TypographyBlockquote,
  TypographyInlineCode,
} from "@/components/ui/typography";

export function TypographyPage() {
  return (
    <div>
      <PageHeader
        title="Typography"
        description="Inter sans + JetBrains Mono. Tight tracking on headings, leading-7 on body."
      />
      <div className="space-y-6">
        <PreviewBlock title="Headings" className="flex-col items-start gap-4">
          <TypographyH1>Heading 1 — extrabold tracking-tight</TypographyH1>
          <TypographyH2>Heading 2 — semibold with border-b</TypographyH2>
          <TypographyH3>Heading 3 — semibold</TypographyH3>
          <TypographyH4>Heading 4 — semibold</TypographyH4>
        </PreviewBlock>

        <PreviewBlock title="Body & inline" className="flex-col items-start gap-4">
          <TypographyP>
            Paragraph text with leading-7. The quick brown fox jumps over the lazy dog.
            Sentences are short. Prefer clarity to cleverness.
          </TypographyP>
          <TypographyLead>Lead — muted text-xl subtitle. Use once per screen max.</TypographyLead>
          <TypographyLarge>Large — text-lg font-semibold</TypographyLarge>
          <TypographySmall>Small — text-sm leading-none font-medium</TypographySmall>
          <TypographyMuted>Muted — text-sm text-muted-foreground</TypographyMuted>
        </PreviewBlock>

        <PreviewBlock title="Blockquote & code" className="flex-col items-start gap-4">
          <TypographyBlockquote>
            Are you absolutely sure? This action cannot be undone.
          </TypographyBlockquote>
          <p className="text-sm">
            Install via <TypographyInlineCode>pnpm add @uni/design-system</TypographyInlineCode> and import components directly.
          </p>
        </PreviewBlock>

        <PreviewBlock title="Font families" className="flex-col items-start gap-3">
          <p className="font-sans text-base">Sans: Inter — The quick brown fox jumps over the lazy dog</p>
          <p className="font-mono text-sm">Mono: JetBrains Mono — const cn = (...args) =&gt; twMerge(clsx(args))</p>
        </PreviewBlock>
      </div>
    </div>
  );
}
