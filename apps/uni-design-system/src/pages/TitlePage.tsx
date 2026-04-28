import { PageHeader, PreviewBlock } from "@/components/PreviewBlock";
import { PageTitle, SectionTitle } from "@/components/ui/title";
import { LayoutDashboard, Settings, Users, FileText } from "lucide-react";

export function TitlePage() {
  return (
    <div>
      <PageHeader
        title="Title"
        description="PageTitle (H1, centered) and SectionTitle (H2, left-aligned) with optional Lucide icon."
      />
      <div className="space-y-6">
        <PreviewBlock title="PageTitle" className="flex-col items-stretch gap-4">
          <PageTitle label="Dashboard" icon={LayoutDashboard} />
          <PageTitle label="Settings" icon={Settings} />
          <PageTitle label="Page without icon" />
        </PreviewBlock>

        <PreviewBlock title="SectionTitle" className="flex-col items-start gap-4">
          <SectionTitle label="Team members" icon={Users} />
          <SectionTitle label="Recent documents" icon={FileText} />
          <SectionTitle label="Section without icon" />
        </PreviewBlock>
      </div>
    </div>
  );
}
