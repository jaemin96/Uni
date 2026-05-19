# Uni

One Source, Every Experience

## Getting started

```bash
pnpm install
pnpm bootstrap              # 모든 .env.example → .env 복사
# .env 파일들 비밀번호 등 수정
pnpm infra:up           # postgres 컨테이너 띄움
pnpm db:migrate         # 모든 app 마이그레이션 적용
pnpm dev                # 개발 시작
```

## 명령어

| 명령 | 설명 |
|---|---|
| `pnpm infra:up` | DB 컨테이너 시작 |
| `pnpm infra:down` | DB 컨테이너 정지 (데이터 유지) |
| `pnpm infra:reset` | DB 완전 초기화 (⚠️ 데이터 삭제) |
| `pnpm infra:psql` | psql 셸 접속 |
| `pnpm db:migrate` | 모든 app 마이그레이션 |
| `pnpm dev` | 모든 app 개발 모드 |
