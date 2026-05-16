# 3주 개발 진행 방식

이 문서는 레포를 실제로 개발할 때 따르는 작업 순서입니다. [`docs/curriculum-3-weeks.md`](curriculum-3-weeks.md)가 학습 일정이라면, 이 문서는 **무엇을 어떤 순서로 만들고 검증할지**를 정리한 개발 운영표입니다.

## 공통 원칙

- 매주 하나의 완성 가능한 목표를 둡니다.
- 기능을 크게 만들기보다 “작게 만들고 바로 검증”합니다.
- 실제 돈, 메인넷, 실거래, 금융 조언, 공식 제휴 표현은 어떤 주차에도 추가하지 않습니다.
- 새 기능은 먼저 기대 동작을 적고, 가능하면 테스트로 보호한 뒤 구현합니다.
- 주차가 끝날 때는 아래 종료 기준을 통과해야 다음 주차로 넘어갑니다.

## 매일 반복 루프

1. 오늘의 작은 목표를 한 문장으로 적습니다.
2. 바꿀 파일을 1~3개로 제한합니다.
3. 구현 또는 문서 수정을 합니다.
4. 관련 명령을 실행합니다.
5. 실패하면 첫 오류부터 고칩니다.
6. 오늘 배운 점과 남은 막힘을 기록합니다.

## 브랜치 예시

혼자 학습할 때는 꼭 브랜치를 나누지 않아도 됩니다. GitHub에 과정을 남기고 싶다면 아래처럼 주차별 브랜치를 사용할 수 있습니다.

| 주차 | 브랜치 예시 | 목적 |
| --- | --- | --- |
| 1주 차 | `week-1-foundation` | 프로젝트 뼈대, 안전 경계, 도메인 모델 |
| 2주 차 | `week-2-market-flow` | 마켓 목록/상세, 거래, 포트폴리오, 정산 |
| 3주 차 | `week-3-polish-deploy` | 목업 지갑, 문서, 테스트, 배포, 포트폴리오 |

## 1주 차 — 기초와 메커니즘 만들기

목표: 앱이 실행되고, 안전 범위가 명확하며, 예측시장 장난감 모델을 테스트로 설명할 수 있게 만듭니다.

### 개발 범위

- Next.js 앱 기본 구조 확인
- 안전/범위 문서 작성 또는 보강
- 마켓 타입과 시드 데이터 정리
- 순수 TypeScript 마켓 엔진 구현
- 단위 테스트 작성

### 주로 보는 파일

- `README.md`
- `docs/safety-and-scope.md`
- `src/types/market.ts`
- `src/data/markets.ts`
- `src/lib/market-engine.ts`
- `tests/unit/market-engine.test.ts`

### 검증 명령

```bash
npm run lint
npm run test
```

### 종료 기준

- 앱이 `npm run dev`로 실행됩니다.
- `npm run test`가 통과합니다.
- YES를 사면 YES 확률이 올라가는 이유를 설명할 수 있습니다.
- 이 레포가 실제 거래소가 아닌 이유를 README 또는 안전 문서에서 확인할 수 있습니다.

## 2주 차 — 사용자가 만지는 제품 흐름 만들기

목표: 학습자가 화면에서 마켓을 고르고, YES/NO를 선택하고, 포트폴리오와 확률 변화를 확인할 수 있게 만듭니다.

### 개발 범위

- 홈 마켓 목록
- 마켓 상세 페이지
- 거래 패널
- 포트폴리오 요약
- localStorage 기반 데모 상태 저장
- 모의 정산 흐름

### 주로 보는 파일

- `src/app/page.tsx`
- `src/app/markets/[slug]/page.tsx`
- `src/components/market/MarketCard.tsx`
- `src/components/market/TradePanel.tsx`
- `src/components/portfolio/PortfolioSummary.tsx`
- `src/lib/portfolio-store.ts`
- `tests/unit/portfolio-store.test.ts`

### 검증 명령

```bash
npm run lint
npm run test
npm run build
```

### 수동 QA 체크

- 홈에서 마켓 카드가 보입니다.
- 마켓 상세로 이동할 수 있습니다.
- YES 거래 후 잔액이 줄고 YES 확률이 올라갑니다.
- NO 거래 후 YES 확률이 내려갑니다.
- 정산 버튼을 누르면 모의 정산 결과가 보입니다.
- 초기화 버튼으로 상태를 되돌릴 수 있습니다.

### 종료 기준

- `npm run build`가 통과합니다.
- 마켓 보기 → YES/NO 선택 → 확률/포지션 업데이트 → 모의 정산 흐름을 완료할 수 있습니다.
- 상태 저장이 클라이언트 전용임을 설명할 수 있습니다.

## 3주 차 — 학습 완성도, QA, 배포 준비

목표: 안전한 목업 지갑과 문서를 정리하고, 자동 검증과 배포 준비까지 마쳐 포트폴리오로 설명할 수 있게 만듭니다.

### 개발 범위

- 목업 지갑 실험
- 학습 콜아웃과 설명 문구 보강
- E2E 테스트 작성
- 배포 문서 작성
- 포트폴리오 설명 정리
- 문제 해결 문서 보강

### 주로 보는 파일

- `src/components/wallet/WalletExperiment.tsx`
- `src/components/learning/LearningCallout.tsx`
- `e2e/market-flow.spec.ts`
- `docs/wallet-experiment.md`
- `docs/vibe-coding-guide.md`
- `docs/deployment.md`
- `docs/portfolio-guide.md`
- `docs/troubleshooting.md`

### 검증 명령

```bash
npm run lint
npm run test
npm run build
npm run test:e2e
```

Playwright 브라우저가 없다면 한 번만 설치합니다.

```bash
npx playwright install chromium
```

### 종료 기준

- 모든 검증 명령이 통과하거나, 실패한 정확한 이유가 문서화됩니다.
- 목업 지갑이 실제 지갑, 시드 문구, 서명, 메인넷을 사용하지 않는다고 설명할 수 있습니다.
- 배포 URL 또는 배포를 막는 정확한 이유가 준비됩니다.
- 포트폴리오 설명에 안전 경계와 기술 선택 이유가 포함됩니다.

## 주차별 진행 체크리스트

| 항목 | 1주 차 | 2주 차 | 3주 차 |
| --- | --- | --- | --- |
| 안전 경계 유지 | ☐ | ☐ | ☐ |
| 기능 구현 | ☐ | ☐ | ☐ |
| 문서 업데이트 | ☐ | ☐ | ☐ |
| 테스트/검증 | ☐ | ☐ | ☐ |
| 막힘 기록 | ☐ | ☐ | ☐ |
| 포트폴리오 메모 | ☐ | ☐ | ☐ |

## AI 어시스턴트에게 요청할 때

좋은 요청 예시:

```text
2주 차 목표 중 거래 패널만 구현하려고 해. 바꿔야 할 파일, 기대 동작, 실행할 테스트를 먼저 정리해줘. 실제 돈/메인넷/금융 조언은 추가하지 마.
```

나쁜 요청 예시:

```text
Polymarket을 똑같이 만들어줘.
```

이 레포의 목표는 제품 복제가 아니라, 안전한 시뮬레이션으로 원리를 배우는 것입니다.
