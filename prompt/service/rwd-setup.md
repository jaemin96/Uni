## Tailwind + shadcn/ui 반응형 Docs 레이아웃

### feature

- Desktop(lg): Sidebar(280px, fixed/sticky), Main(scrollable).
- Mobile(<lg): Sidebar hidden, Top Navbar(Sticky) 포함.
- Mobile Sidebar: shadcn/ui 'Sheet' 컴포넌트 활용.
- 구성요소: Sidebar.tsx, MobileNav.tsx, Layout.tsx 분리해서 작성.

### ref

- 스타일 단위는 `rem` 을 기본적으로 설정해두지만 `px`단위가 고정적으로 필요한 경우 사용 허가
- 데스크톱, 테블릿, 모바일 세 가지의 경우를 고려
- 디바이스 크기별로 추후에도 고도화 할 수 있게 구조 확실히 잡아줘
