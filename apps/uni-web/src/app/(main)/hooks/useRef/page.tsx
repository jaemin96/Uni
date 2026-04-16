import { PageLayout } from "@/components/ui/page-layout";

export default function UseRefPage() {
  return (
    <PageLayout
      title="useRef"
      description="렌더링 없이 값을 유지하거나 DOM 요소에 직접 접근할 때 사용합니다."
    >
      <div className="flex flex-col gap-6 max-w-xl">{/* content */}</div>
    </PageLayout>
  );
}
