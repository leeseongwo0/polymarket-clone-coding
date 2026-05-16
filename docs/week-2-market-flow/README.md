# 2주 차 — 제품 흐름

2주 차 목표는 **학습자가 화면에서 마켓을 선택하고, YES/NO 거래를 실행하고, 포트폴리오와 모의 정산을 확인할 수 있는 상태**를 만드는 것입니다.

## 2주 차 학습 항목 6개

1. **홈 마켓 목록 구성**
   - `src/app/page.tsx`를 읽습니다.
   - `seedMarkets`가 카드 목록으로 렌더링되는 흐름을 확인합니다.
   - 홈 화면의 안전 문구가 유지되는지 확인합니다.

2. **마켓 카드와 상세 이동 이해**
   - `src/components/market/MarketCard.tsx`를 읽습니다.
   - 카드에서 YES 확률, 거래량, 마감일을 표시하는 방식을 확인합니다.
   - 카드를 누르면 `/markets/[slug]`로 이동하는 구조를 이해합니다.

3. **마켓 상세 페이지 연결**
   - `src/app/markets/[slug]/page.tsx`를 읽습니다.
   - `generateStaticParams`와 `getMarketBySlug`의 역할을 확인합니다.
   - 없는 slug가 들어오면 `notFound()`로 처리되는 이유를 이해합니다.

4. **거래 패널 사용 흐름 구현/이해**
   - `src/components/market/TradePanel.tsx`를 읽습니다.
   - 지분 입력 → YES/NO 버튼 → `applyTrade` → 상태 저장 → 메시지 표시 흐름을 따라갑니다.
   - 잘못된 지분이 잔액을 망가뜨리지 않는지 확인합니다.

5. **포트폴리오와 localStorage 상태 이해**
   - `src/components/portfolio/PortfolioSummary.tsx`를 읽습니다.
   - `src/lib/portfolio-store.ts`에서 저장/불러오기/초기화 흐름을 확인합니다.
   - 이 상태가 서버나 데이터베이스가 아니라 클라이언트 학습용 저장소임을 설명합니다.

6. **모의 정산 흐름 확인**
   - YES 또는 NO로 데모를 정산해 봅니다.
   - 승리 지분의 2배가 플레이 크레딧으로 지급되는 단순 모델을 확인합니다.
   - 실제 자산 정산이 아니라 학습용 계산임을 문서와 UI에서 확인합니다.

## 2주 차 주요 파일

- `src/app/page.tsx`
- `src/app/markets/[slug]/page.tsx`
- `src/components/market/MarketCard.tsx`
- `src/components/market/TradePanel.tsx`
- `src/components/portfolio/PortfolioSummary.tsx`
- `src/lib/portfolio-store.ts`
- `tests/unit/portfolio-store.test.ts`

## 2주 차 검증 명령

```bash
npm run lint
npm run test
npm run build
```

## 2주 차 수동 QA

- 홈에서 마켓 카드가 보입니다.
- 마켓 상세로 이동할 수 있습니다.
- YES 거래 후 잔액이 줄고 YES 확률이 올라갑니다.
- NO 거래 후 YES 확률이 내려갑니다.
- 정산 버튼을 누르면 모의 정산 결과가 보입니다.
- 초기화 버튼으로 상태를 되돌릴 수 있습니다.

## 2주 차 완료 기준

- `npm run build`가 통과합니다.
- 마켓 보기 → YES/NO 선택 → 확률/포지션 업데이트 → 모의 정산 흐름을 완료할 수 있습니다.
- 상태 저장이 클라이언트 전용임을 설명할 수 있습니다.
