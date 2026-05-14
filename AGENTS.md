# Project Agent Guidance — Polymarket Mechanics Lab

This repository is an educational clone-coding project for beginners. Follow the approved Ralph plan in `.omx/plans/ralplan-polymarket-clone-beginners.md`.

## Safety and Scope
- Keep the app educational and simulation-only.
- Do not add mainnet, real money, real trading, real betting, financial advice, or production prediction-market framing.
- Do not copy Polymarket trademarks, logos, brand assets, or claim official affiliation.
- Keep wallet functionality as a mock/non-mainnet learning experiment unless a future task explicitly approves external wallet tooling.

## Engineering Defaults
- Use `npm` as the single documented package manager.
- Keep prediction-market math in pure TypeScript functions under `src/lib/market-engine.ts`.
- Keep trade, portfolio, localStorage, and mock wallet behavior client-only.
- Keep route handlers read-only in v1.
- Prefer clear beginner-readable code and docs over production-level complexity.

## Verification
Before claiming implementation complete, run and read:
- `npm run lint`
- `npm run test`
- `npm run build`
- `npm run test:e2e`

If E2E cannot run, document the exact blocker and do not claim full automated E2E coverage.
