# [High-Level Headless Cart]

## Features

- useReducer: 복잡한 장바구니 상태(추가, 삭제, 수량변경) 관리
- useMemo: 총 가격, 할인율 등 무거운 계산 최적화
- useCallback: 자식 컴포넌트(아이템)의 리렌더링 방지를 위한 핸들러 고정
- useEffect: 로컬 스토리지와 상태 동기화
- useRef: 애니메이션 트리거 또는 이전 상태값 추적
- Headless UI: 로직은 훅에, UI는 별도 컴포넌트에 분리

## Domain

### 1. 상태 및 기본 액션 (State & Actions)

> 장바구니의 가장 핵심적인 데이터 흐름

- **초기화**: localStorage에 저장된 데이터가 있으면 불러오고, 없으면 빈 배열로 시작
- **ADD**: 이미 있는 상품이면 수량만 +1, 새로운 상품이면 배열에 추가
- **REMOVE**: 특정 ID의 상품을 배열에서 제거
- **UPDATE_QTY**: 특정 상품의 수량 변경 (최소 1개 미만으로 내려가지 않도록 방어 로직)
- **CLEAR**: 장바구니 전체 초기화

---

### 2. 파생 데이터 계산 (Derived Data)

> 상태값(items)을 기반으로 실시간 계산되어야 하는 값들

- **총 수량**: 모든 아이템의 quantity 합계 → Header Badge용
- **소계 (Subtotal)**: 각 아이템의 (가격 × 수량) 합계
- **할인 (Discount)**: 총액 10만원 이상이면 10% 할인 (또는 고정 할인 금액)
- **최종 결제 금액**: 소계에서 할인을 적용한 금액

---

### 3. 동기화 및 부수 효과 (Side Effects)

> React 외부 환경과의 연결

- **Persistence**: 장바구니 상태 변경 시마다 localStorage에 동기화
- **Logging**: 아이템 추가/삭제 시 console.log 또는 가상의 분석 도구로 이벤트 전송

---

### 4. 최적화 및 안정성 (Optimization)

- **함수 고정**: 자식 컴포넌트에 넘길 핸들러가 부모 리렌더링마다 새로 생성되지 않도록 처리
- **연산 방어**: items 배열이 변하지 않았다면 가격 계산(할인율 등)이 재실행되지 않도록 처리

---

### 5. 상태 추적 및 트리거 (Tracking & Trigger)

> UX를 위한 정교한 제어

- **이전 상태 비교**: 아이템 개수가 이전보다 증가했는지 감지 → "상품이 담겼습니다!" 애니메이션 신호
- **타이머 제어**: 상품 담은 후 5분 동안 결제 없으면 알림 (가상 구현)

---

## 도전 과제: 어떤 훅을 어디에 배치할 것인가?


| 구현 기능                 | 사용할 훅              | 이유                                                                                                                                                                         |
| --------------------- | ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 장바구니 추가/삭제/수량변경 로직    | useReducer         | 데이터를 핸들링 하는 로직들은 dispatch를 통하기 위해 → ✅ ADD/REMOVE/UPDATE_QTY 등 여러 액션이 하나의 `items` 상태를 공유하므로 dispatch로 흐름을 단일화하는 게 핵심. 정확함                                                   |
| 합계 금액 / 할인율 계산        | useMemo            | 실제로 특정 비율이 정해져있고 그 비율로 특정 값을 계산하기 위해 고정된 값을 기억 (상수), 복잡한 할인율도 고려하여 메모제이션 반영 (useMemo) → ✅ 할인율은 `const DISCOUNT_RATE = 0.1`로 상수 선언, 계산값은 `useMemo`로 메모이제이션. `useState` 없이 파생값 처리 |
| 자식 컴포넌트로 보낼 핸들러 함수    | useCallback        | 부모에서 정의한 함수가 자식에서 불러다 쓸 경우 리렌더링이 계속 되면 안되니까 메모제이션 처리 해둬야함 → ✅ 함수 참조를 고정해서 `React.memo`로 감싼 자식의 불필요한 리렌더링 방지. 의존성 배열 관리가 포인트                                           |
| 로컬스토리지 저장 / 불러오기      | useEffect          | 스토리지에 저장할 값이 변경될 때마다 값을 갱신해줘야 하기 때문에 추적해야함 → ✅ 저장은 `[items]` 의존성으로, 불러오기는 마운트 시 `[]`로 분리. 외부 저장소 접근은 side effect이므로 `useMemo` 아닌 `useEffect`가 맞음                          |
| 아이템 추가 시 애니메이션 트리거 감지 | useRef + useEffect | 화면의 변화를 데이터가 업데이트 됐을때만 조작하기 위해서 → ⚠️ "증가했을 때만" 트리거하려면 이전 수량과 비교 필요. `useRef`로 이전 값 보관, `useEffect`로 변화 감지하는 조합으로 수정                                                      |
| 가상 타이머 ID 보관          | useRef             | 실제로 저장되는 상태 값이 아닌 참조하는 ID라서 메모리 기억 느낌으로만 사용 → ✅ 렌더링과 무관하게 ID만 들고 있으면 되므로 정확함. 상태로 관리하면 ID 바뀔 때마다 불필요한 리렌더링 발생                                                          |

---

## 구현 체크리스트

### 1. 타입 정의 (`types.ts`)
- [ ] `CartItem` 타입 정의 (id, name, price, quantity)
- [ ] `CartState` 타입 정의 (items 배열)
- [ ] `CartAction` 유니온 타입 정의 (ADD / REMOVE / UPDATE_QTY / CLEAR / INIT)

### 2. Reducer 작성 (`cartReducer.ts`)
- [ ] ADD — 이미 있는 상품이면 quantity +1, 없으면 배열에 추가
- [ ] REMOVE — 특정 id 상품 제거
- [ ] UPDATE_QTY — 수량 변경 (최소 1 미만 방어 로직)
- [ ] CLEAR — 전체 초기화
- [ ] INIT — localStorage에서 불러온 데이터로 초기화

### 3. useCart 훅 기본 뼈대 (`useCart.ts`)
- [ ] `useReducer`로 상태 연결

### 4. localStorage 연동
- [ ] 마운트 시 저장된 데이터 불러오기 (`useEffect` + INIT 디스패치)
- [ ] `items` 변경 시 localStorage에 저장 (`useEffect`)

### 5. 파생 데이터 계산
- [ ] `totalCount` — 전체 수량 합계 (`useMemo`)
- [ ] `subtotal` — 가격 × 수량 합계 (`useMemo`)
- [ ] `discount` — 10만원 이상 시 10% 할인 (`useMemo`)
- [ ] `total` — 최종 결제 금액 (`useMemo`)

### 6. 핸들러 고정
- [ ] `addItem` (`useCallback`)
- [ ] `removeItem` (`useCallback`)
- [ ] `updateQty` (`useCallback`)
- [ ] `clearCart` (`useCallback`)

### 7. 이전 상태 추적
- [ ] `useRef`로 이전 itemCount 보관
- [ ] `useEffect`로 증가 감지 → 애니메이션 트리거 플래그 설정

### 8. 가상 타이머
- [ ] `useRef`로 타이머 ID 보관
- [ ] 아이템 추가 시 5분 타이머 시작
- [ ] 기존 타이머 있으면 초기화 후 재시작

### 9. UI 연결
- [ ] `useCart` 훅을 소비하는 CartContainer 컴포넌트 작성
- [ ] CartItem 컴포넌트 작성 (`React.memo` 적용)
