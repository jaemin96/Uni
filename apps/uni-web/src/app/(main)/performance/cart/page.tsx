import { PageLayout } from "@/components/ui/page-layout";

export default function UseRefPage() {
  return (
    <PageLayout
      title="cart"
      description="Headless UI 설계와 React Hook 활용 능력 향상을 위해 구축해본 간단한 장바구니 예제"
    >
      <div className="flex flex-col gap-6 max-w-xl">
        <span>장바구니 예제</span>
      </div>
    </PageLayout>
  );
}
