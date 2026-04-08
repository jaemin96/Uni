# uni

## 행동 규칙

- 확인 요청·선택지 제시 금지. 최선의 판단으로 바로 진행.
- 코드 수정 전 구현 계획 먼저 요약 보고.
- 전체 빌드/테스트/린트 금지 → 변경 파일만. 빌드 필요 시 확인 먼저.
- `pnpm install` 임의 실행 금지 → 패키지 추가 전 물어보기.
- 파일 읽기 시 필요한 부분만, `git log`는 항상 `-n 10` 제한.

## 스택

Next.js 14 (App Router), TypeScript Strict, Tailwind, Framer Motion, Zustand, Supabase, pnpm

## 코딩 컨벤션

- 컴포넌트: `ui/`(원자) / `features/`(기능) 구분
- 상태: 클라이언트=Zustand, 서버=TanStack Query
- `type` 키워드 사용 (`interface` 대신)
- API 호출 시 반드시 `try-catch` + 에러 Toast
