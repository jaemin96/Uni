## 인증 기능

### 도메인

- 현재 해당 서비스는 로그인 인증 불필요

### 로그인

- 사이드메뉴 로그인페이지 이동 메뉴를 추가
- 로그인 계정은 로컬에 id: <dev@test.com> / pw: qwer1234 로 하드코딩 진행 (별도 파일로 관리)
- 로그인폼에 아이디와 패스워드 자동 기입
- 로그인 진행 시 인증 방식은 JWT 인증 방식으로 진행
  - access-token은 10분, Refresh-token은 RTR (Refresh Token Rotation) 전략 사용
    1. Access Token이 만료되어 Refresh Token으로 재발급을 요청 시, 기존 Refresh Token을 폐기하고 새로운 Refresh Token을 함께 발급
    2. 이미 사용된 토큰으로 재발급 요청이 들어오는 순간 "해킹 징후"로 판단하고 모든 세션을 강제 로그아웃
- BEF (Backend For Frontend) 패턴
  - API Routes나 별도의 프록시 서버를 BFF로 활용
- 토큰 저장은 Strict 또는 Lax 설정의 HttpOnly 쿠키 활용 형태로 진행 (local, session 스토리지 지양)

### 화면구성

- 인증 성공 가정하여 JWT를 발급하고 access-token과 refresh-token을 화면에 별도 표기
- access-token의 경우 만료예정일과 만료 여부를 UI로 표기
- refresh-token의 경우 발급일을 표기

---

### 추후 진행 (예정으로 현재는 진행하지않음)

- WebAuthn (Passkeys)
  - 생체 인식(FaceID, 지문)이나 기기 PIN 번호 사용, 비대칭키 방식 인증
  - 기존 이메일 로그인과 더불어 **2FA(2단계 인증)**로 WebAuthn을 얹거나, 아예 Passwordless 환경 지향

- 실제 구현 사용 스펙 조합 (택 1)
  - Auth0 / Okta
  - Clerk / Kinde
  - Supabase Auth
  - Auth.js (NextAuth.js)
