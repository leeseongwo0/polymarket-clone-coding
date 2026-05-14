# Polymarket Mechanics Lab

A beginner-friendly, **simulation-only** clone-coding repository inspired by prediction-market products. The goal is not to recreate Polymarket as a production service. The goal is to help development beginners build, understand, test, and deploy a safe app that demonstrates prediction-market mechanics.

> Safety boundary: this project uses play credits only. It has no mainnet, no real money, no betting, no trading, no investment advice, and no official Polymarket affiliation. It does not copy Polymarket logos, trademarks, or brand assets.

## What you will build

- A Next.js app with seeded educational markets.
- A market detail page where learners choose YES or NO with play credits.
- A toy probability model that moves when learners place simulated trades.
- A simulated settlement flow with play-credit payouts.
- A mock wallet experiment that never asks for credentials and never connects to mainnet.
- Docs and prompts designed for vibe-coding with an AI assistant.
- Quality checks with lint, unit tests, build, and E2E tests.

## Prerequisites

- Node.js 20.9 or newer.
- npm. This repo intentionally documents one package-manager path for beginners.

## Quick start

```bash
npm install
npm run dev
```

Open <http://localhost:3000> and choose a seeded market.

## Quality checks

```bash
npm run lint
npm run test
npm run build
npm run test:e2e
```

If Playwright browsers are not installed yet, run:

```bash
npx playwright install chromium
```

Manual QA can supplement E2E while learning, but final completion should not claim full automated E2E coverage unless `npm run test:e2e` passes or an explicit gap is documented.

## Suggested 3-week learning path

| Week | Goal | Exit criteria |
| --- | --- | --- |
| 1 | Scaffold, safety docs, domain model, seed markets | App boots; safety docs exist; market engine unit tests pass. |
| 2 | Market list/detail, trade panel, portfolio, settlement | A learner completes market view → YES/NO trade → probability/position update → simulated settlement locally. |
| 3 | Mock wallet, vibe-coding docs, tests, deployment, portfolio polish | Shareable deploy path is documented; quality checks pass; docs explain the project story. |

See [`docs/curriculum-3-weeks.md`](docs/curriculum-3-weeks.md) for the detailed path and [`docs/deployment.md`](docs/deployment.md) for beginner deployment steps.

## Project structure

```text
src/app/                     Next.js App Router pages and read-only API route
src/components/              Market UI, portfolio, learning callouts, mock wallet
src/data/markets.ts          Seeded educational markets
src/lib/market-engine.ts     Pure TypeScript prediction-market toy model
src/lib/portfolio-store.ts   Client localStorage helpers
tests/unit/                  Vitest domain tests
e2e/                         Playwright smoke tests
docs/                        Safety, curriculum, vibe-coding, deployment, portfolio, wallet, troubleshooting
```

## Deploy

The app is designed for a Vercel-friendly Next.js deployment.

1. Push the repo to GitHub.
2. Import it in Vercel.
3. Keep the default build command: `npm run build`.
4. Share the deployed URL as your portfolio/demo link.

## Portfolio explanation

A concise story:

> I built a simulation-only prediction-market lab for beginners. It uses Next.js, TypeScript, and Tailwind. The domain logic is a pure TypeScript toy model, so it is easy to test. The app teaches market view, YES/NO position changes, probability movement, and simulated settlement with play credits. It intentionally excludes mainnet, real money, financial advice, and production trading complexity.

Read [`docs/portfolio-guide.md`](docs/portfolio-guide.md) for a fuller version.
