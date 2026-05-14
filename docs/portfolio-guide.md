# Portfolio Guide

## One-paragraph project story

After `npm run lint`, `npm run test`, `npm run build`, and `npm run test:e2e` pass, you can say:

I built Polymarket Mechanics Lab, a simulation-only prediction-market clone-coding app for beginners that is not affiliated with Polymarket. It teaches market browsing, YES/NO choices, probability movement, portfolio changes, and simulated settlement using play credits. I used Next.js, TypeScript, Tailwind CSS, a pure TypeScript domain engine, unit tests, E2E tests, and beginner-facing docs. I intentionally excluded real money, mainnet, financial advice, production trading systems, and official Polymarket branding.

## Architecture talking points

- **Next.js App Router** for a deployable app structure.
- **Pure domain engine** in `src/lib/market-engine.ts` for testable mechanics.
- **Read-only route handler** to demonstrate a backend boundary without production complexity.
- **Client-only localStorage state** for play-credit portfolio and demo market changes.
- **Mock wallet** for safe wallet UX learning without credentials, signatures, or network setup.

## Tradeoffs

- The market model is intentionally approximate.
- The wallet is mock by default because real wallet tooling would add setup friction.
- The app is Polymarket-inspired but not a pixel-perfect clone.
- Docs are part of the product because the target learner is a beginner.


## If something was not fully tested

Be precise instead of overclaiming. For example:

> Unit tests and production build passed. E2E was not completed because Playwright browser installation failed on my machine; the manual QA checklist passed for market view, YES/NO trade, simulated settlement, and mock wallet.

## Copy-paste safety line

This project is not affiliated with Polymarket. It uses play credits only and does not include real money, mainnet, financial advice, or production trading behavior.
