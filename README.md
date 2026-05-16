# 폴리마켓 메커니즘 실험실

초보자를 위한 **시뮬레이션 전용** 클론코딩 레포입니다. 예측시장 제품에서 볼 수 있는 기본 원리를 안전하게 따라 만들어 보되, Polymarket을 운영 서비스처럼 재현하는 것이 목표는 아닙니다. 목표는 개발 입문자가 앱을 만들고, 이해하고, 테스트하고, 배포하면서 예측시장 메커니즘을 배우는 것입니다.

> 안전 경계: 이 프로젝트는 플레이 크레딧만 사용합니다. 메인넷, 실제 돈, 베팅, 실거래, 투자 조언, Polymarket 공식 제휴가 없습니다. Polymarket 로고, 상표, 브랜드 자산도 복사하지 않습니다.

## 무엇을 만들나요?

- 시드 학습용 마켓을 보여주는 Next.js 앱
- 학습자가 플레이 크레딧으로 YES 또는 NO를 선택하는 마켓 상세 페이지
- 모의 거래 후 확률이 움직이는 장난감 확률 모델
- 플레이 크레딧 지급을 보여주는 모의 정산 흐름
- 실제 지갑 연결 없이 UX만 맛보는 목업 지갑 실험
- AI 어시스턴트와 함께 학습하기 위한 한국어 문서와 프롬프트
- lint, 단위 테스트, 빌드, E2E 테스트로 구성된 품질 확인 루틴

## 준비물

- Node.js 20.9 이상
- npm: 초보자가 헷갈리지 않도록 이 레포는 npm 경로만 문서화합니다.

## 빠른 시작

```bash
npm install
npm run dev
```

브라우저에서 <http://localhost:3000>을 열고 시드 마켓을 선택하세요.

## 품질 확인

```bash
npm run lint
npm run test
npm run build
npm run test:e2e
```

Playwright 브라우저가 아직 설치되지 않았다면 한 번만 실행합니다.

```bash
npx playwright install chromium
```

학습 중에는 수동 QA로 보완할 수 있습니다. 다만 최종 완료를 말할 때는 `npm run test:e2e`가 통과했거나, 통과하지 못한 정확한 이유를 문서화해야 합니다.

## 추천 3주 학습 루트

| 주차 | 목표 | 종료 기준 |
| --- | --- | --- |
| 1주 차 | 스캐폴드, 안전 문서, 도메인 모델, 시드 마켓 | 앱이 실행되고, 안전 문서가 있으며, 마켓 엔진 단위 테스트가 통과합니다. |
| 2주 차 | 마켓 목록/상세, 거래 패널, 포트폴리오, 정산 | 마켓 보기 → YES/NO 거래 → 확률/포지션 업데이트 → 로컬 모의 정산을 완료합니다. |
| 3주 차 | 목업 지갑, AI 학습 문서, 테스트, 배포, 포트폴리오 정리 | 공유 가능한 배포 경로가 문서화되고, 품질 확인이 통과하며, 프로젝트 설명이 준비됩니다. |

자세한 일정은 [`docs/curriculum-3-weeks.md`](docs/curriculum-3-weeks.md), 초보자 배포 절차는 [`docs/deployment.md`](docs/deployment.md)를 보세요.

## 프로젝트 구조

```text
src/app/                     Next.js App Router 페이지와 읽기 전용 API 라우트
src/components/              마켓 UI, 포트폴리오, 학습 콜아웃, 목업 지갑
src/data/markets.ts          시드 학습용 마켓
src/lib/market-engine.ts     순수 TypeScript 예측시장 장난감 모델
src/lib/portfolio-store.ts   클라이언트 localStorage 도우미
tests/unit/                  Vitest 도메인 테스트
e2e/                         Playwright 스모크 테스트
docs/                        안전, 커리큘럼, AI 학습, 배포, 포트폴리오, 지갑, 문제 해결 문서
```

## 배포

이 앱은 Vercel에 올리기 쉬운 Next.js 구조입니다.

1. 레포를 GitHub에 push합니다.
2. Vercel에서 프로젝트를 import합니다.
3. 기본 빌드 명령을 `npm run build`로 유지합니다.
4. 배포 URL을 포트폴리오/데모 링크로 공유합니다.

## 포트폴리오 설명 예시

> 초보자를 위한 시뮬레이션 전용 예측시장 메커니즘 실험실을 만들었습니다. Next.js, TypeScript, Tailwind를 사용했고, 도메인 로직은 테스트하기 쉬운 순수 TypeScript 장난감 모델로 분리했습니다. 앱은 마켓 보기, YES/NO 포지션 변화, 확률 움직임, 플레이 크레딧 기반 모의 정산을 설명합니다. 메인넷, 실제 돈, 투자 조언, 실거래 복잡도는 의도적으로 제외했습니다.

더 긴 설명은 [`docs/portfolio-guide.md`](docs/portfolio-guide.md)를 참고하세요.
