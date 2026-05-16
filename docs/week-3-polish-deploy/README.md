# 3주 차 — QA, 배포, 포트폴리오

3주 차 목표는 **목업 지갑, 학습 문서, E2E 테스트, 배포 준비, 포트폴리오 설명까지 정리해 공유 가능한 학습 프로젝트로 마무리**하는 것입니다.

## 3주 차 학습 항목 6개

1. **목업 지갑 실험 이해**
   - `src/components/wallet/WalletExperiment.tsx`를 읽습니다.
   - 데모 주소가 화면에서 생성될 뿐 실제 지갑이 연결되지 않는다는 점을 확인합니다.
   - `docs/wallet-experiment.md`에서 하지 않는 일을 확인합니다.

2. **학습 콜아웃과 설명 문구 점검**
   - `src/components/learning/LearningCallout.tsx`를 읽습니다.
   - 거래 후 확률이 움직이는 설명이 초보자에게 충분한지 확인합니다.
   - 금융 조언처럼 보이는 표현이 없는지 점검합니다.

3. **E2E 테스트로 핵심 흐름 보호**
   - `e2e/market-flow.spec.ts`를 읽습니다.
   - 마켓 탐색, YES/NO 거래, 정산, 목업 지갑, 안전 문구 테스트가 무엇을 보호하는지 확인합니다.
   - 필요하면 `npx playwright install chromium`으로 브라우저를 설치합니다.

4. **초보자 문서 정리**
   - `docs/vibe-coding-guide.md`와 `docs/troubleshooting.md`를 읽습니다.
   - AI에게 질문할 때 붙여 넣을 증거 패턴을 확인합니다.
   - 흔한 오류를 먼저 확인하는 습관을 만듭니다.

5. **배포 준비**
   - `docs/deployment.md`를 읽습니다.
   - GitHub와 Vercel 배포 흐름을 확인합니다.
   - 배포가 막히면 정확한 오류와 환경 정보를 기록합니다.

6. **포트폴리오 설명 작성**
   - `docs/portfolio-guide.md`를 읽습니다.
   - 기술 선택, 안전 경계, 테스트 증거, 의도적으로 제외한 범위를 한 문단으로 설명합니다.
   - 스크린샷이나 배포 URL을 포트폴리오 증거로 준비합니다.

## 3주 차 주요 파일

- `src/components/wallet/WalletExperiment.tsx`
- `src/components/learning/LearningCallout.tsx`
- `e2e/market-flow.spec.ts`
- `docs/wallet-experiment.md`
- `docs/vibe-coding-guide.md`
- `docs/deployment.md`
- `docs/portfolio-guide.md`
- `docs/troubleshooting.md`

## 3주 차 검증 명령

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

## 3주 차 완료 기준

- 모든 검증 명령이 통과하거나, 실패한 정확한 이유가 문서화됩니다.
- 목업 지갑이 실제 지갑, 시드 문구, 서명, 메인넷을 사용하지 않는다고 설명할 수 있습니다.
- 배포 URL 또는 배포를 막는 정확한 이유가 준비됩니다.
- 포트폴리오 설명에 안전 경계와 기술 선택 이유가 포함됩니다.
