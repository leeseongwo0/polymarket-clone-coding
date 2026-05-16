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

## 개발환경 준비

아무것도 설치되어 있지 않다고 가정하고 시작합니다. 이 레포는 초보자가 헷갈리지 않도록 **npm만** 사용합니다. Node.js는 **20.9 이상**이면 됩니다. 설치 후에는 항상 `node --version`과 `npm --version`으로 확인하세요.

### macOS

1. **터미널 열기**
   - Spotlight에서 `Terminal`을 검색해 실행합니다.

2. **Apple 개발 도구 설치**

   ```bash
   xcode-select --install
   ```

   이미 설치되어 있다는 메시지가 나오면 넘어가도 됩니다.

3. **Homebrew 설치**
   - 공식 사이트: <https://brew.sh/>
   - 사이트에 표시되는 설치 명령을 터미널에 붙여 넣습니다.
   - 설치가 끝난 뒤 안내되는 `eval ...` 명령이 있으면 그대로 실행합니다.

4. **Git과 Node.js 설치**

   ```bash
   brew install git node
   ```

   Node.js 공식 다운로드 페이지를 사용해도 됩니다: <https://nodejs.org/en/download/>

5. **설치 확인**

   ```bash
   git --version
   node --version
   npm --version
   ```

   `node --version`이 `v20.9.0` 이상이면 이 레포를 실행할 수 있습니다.

### Windows — WSL2 권장

Windows에서는 PowerShell에서 직접 개발하기보다 **WSL2 + Ubuntu**를 권장합니다. 프로젝트 파일도 Windows의 `C:\...` 아래가 아니라 WSL 안의 `~/projects` 같은 Linux 경로에 두는 편이 문제를 줄입니다.

1. **WSL2 설치**
   - Microsoft 공식 한국어 문서: <https://learn.microsoft.com/ko-kr/windows/wsl/install>
   - WSL 개발 환경 설정 한국어 문서: <https://learn.microsoft.com/ko-kr/windows/wsl/setup/environment>

   관리자 권한 PowerShell에서 실행합니다.

   ```powershell
   wsl --install -d Ubuntu
   ```

   설치 후 재부팅하라는 안내가 나오면 재부팅합니다. Ubuntu가 처음 열리면 Linux 사용자 이름과 비밀번호를 만듭니다.

2. **Ubuntu 업데이트**

   아래 명령은 **Ubuntu 터미널**에서 실행합니다.

   ```bash
   sudo apt update
   sudo apt upgrade -y
   ```

3. **기본 개발 도구 설치**

   ```bash
   sudo apt install -y git curl ca-certificates build-essential
   ```

4. **Node.js 설치**

   가장 쉬운 방법은 Node.js 공식 다운로드 페이지의 Linux/nvm 안내를 따르는 것입니다: <https://nodejs.org/en/download/>

   설치 후 Ubuntu 터미널에서 확인합니다.

   ```bash
   node --version
   npm --version
   ```

   `node --version`이 `v20.9.0` 이상인지 확인하세요.

5. **프로젝트 폴더 만들기**

   ```bash
   mkdir -p ~/projects
   cd ~/projects
   ```

   GitHub에서 이 레포를 clone했다면 `cd polymarket-clone-coding`으로 들어갑니다. zip으로 받았다면 WSL의 `~/projects` 아래에 압축을 풀어 사용하세요.

## 빠른 시작

프로젝트 폴더 안에서 실행합니다.

```bash
npm install
npm run dev
```

브라우저에서 <http://localhost:3000>을 열고 시드 마켓을 선택하세요. WSL2에서 실행했다면 Windows 브라우저에서도 같은 주소로 접속할 수 있습니다.

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

## 3주 개발 진행 방식

이 레포는 3주 동안 단계적으로 개발하는 흐름을 기준으로 정리되어 있습니다.

| 주차 | 개발 목표 | 주요 산출물 | 종료 기준 |
| --- | --- | --- | --- |
| 1주 차 | 기초와 메커니즘 만들기 | 안전 문서, 타입, 시드 마켓, 순수 TypeScript 마켓 엔진, 단위 테스트 | 앱이 실행되고 `npm run test`가 통과합니다. |
| 2주 차 | 사용자가 만지는 제품 흐름 만들기 | 마켓 목록/상세, 거래 패널, 포트폴리오, localStorage 상태, 모의 정산 | 마켓 보기 → YES/NO 거래 → 확률/포지션 업데이트 → 모의 정산을 완료합니다. |
| 3주 차 | 학습 완성도, QA, 배포 준비 | 목업 지갑, 학습 문서, E2E 테스트, 배포 문서, 포트폴리오 설명 | 전체 품질 확인이 통과하고 배포 또는 정확한 배포 막힘이 문서화됩니다. |

개발 운영표는 [`docs/3-week-development-workflow.md`](docs/3-week-development-workflow.md), 주차별 학습 폴더는 [`docs/week-1-foundation/`](docs/week-1-foundation/), [`docs/week-2-market-flow/`](docs/week-2-market-flow/), [`docs/week-3-polish-deploy/`](docs/week-3-polish-deploy/)를 보세요. 전체 커리큘럼은 [`docs/curriculum-3-weeks.md`](docs/curriculum-3-weeks.md), 초보자 배포 절차는 [`docs/deployment.md`](docs/deployment.md)에 있습니다.

## 프로젝트 구조

```text
src/app/                     Next.js App Router 페이지와 읽기 전용 API 라우트
src/components/              마켓 UI, 포트폴리오, 학습 콜아웃, 목업 지갑
src/data/markets.ts          시드 학습용 마켓
src/lib/market-engine.ts     순수 TypeScript 예측시장 장난감 모델
src/lib/portfolio-store.ts   클라이언트 localStorage 도우미
tests/unit/                  Vitest 도메인 테스트
e2e/                         Playwright 스모크 테스트
docs/                        안전, 커리큘럼, 주차별 학습 폴더, AI 학습, 배포, 포트폴리오 문서
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
