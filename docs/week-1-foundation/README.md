# 1주 차 — 기초와 메커니즘

1주 차 목표는 **앱이 실행되고, 안전 범위가 명확하며, 예측시장 장난감 모델을 테스트로 설명할 수 있는 상태**를 만드는 것입니다.

## 1주 차 학습 항목 5개

1. **프로젝트 실행 환경 준비**
   - `npm install`을 실행합니다.
   - `npm run dev`로 앱이 열리는지 확인합니다.
   - Node.js와 npm만 사용하는 이유를 README에서 확인합니다.

2. **안전 범위 이해**
   - `docs/safety-and-scope.md`를 읽습니다.
   - 실제 돈, 메인넷, 실거래, 금융 조언, 공식 제휴가 왜 제외되는지 정리합니다.
   - README의 안전 문구가 앱 목표와 맞는지 확인합니다.

3. **마켓 데이터 구조 읽기**
   - `src/types/market.ts`에서 `Market`, `Portfolio`, `Transaction` 타입을 읽습니다.
   - `src/data/markets.ts`에서 시드 마켓 3개를 확인합니다.
   - 각 마켓의 `yesPool`, `noPool`, `playVolume`이 무엇을 뜻하는지 적어봅니다.

4. **마켓 엔진 이해 또는 구현**
   - `src/lib/market-engine.ts`를 읽습니다.
   - YES를 사면 YES 풀이 늘고, NO를 사면 NO 풀이 늘어나는 흐름을 따라갑니다.
   - `calculateYesProbability`, `applyTrade`, `settleMarket`의 역할을 구분합니다.

5. **단위 테스트로 메커니즘 보호**
   - `tests/unit/market-engine.test.ts`를 읽습니다.
   - YES/NO 거래, 잘못된 지분, 정산 테스트가 어떤 동작을 보호하는지 확인합니다.
   - `npm run test`로 테스트를 실행합니다.

## 1주 차 주요 파일

- `README.md`
- `docs/safety-and-scope.md`
- `src/types/market.ts`
- `src/data/markets.ts`
- `src/lib/market-engine.ts`
- `tests/unit/market-engine.test.ts`

## 1주 차 검증 명령

```bash
npm run lint
npm run test
```

## 1주 차 완료 기준

- 앱이 `npm run dev`로 실행됩니다.
- `npm run lint`와 `npm run test`가 통과합니다.
- YES를 사면 왜 YES 확률이 올라가는지 설명할 수 있습니다.
- 이 앱이 실제 거래소가 아닌 이유를 설명할 수 있습니다.
