# 3-Week Curriculum

This schedule is a proposed learning path. It keeps the mock wallet as the safe default and avoids real wallet dependencies unless a future task explicitly confirms that expansion.

## Beginner day-by-day checkpoints

- **Day 1:** install dependencies, run the dev server, read the safety scope.
- **Day 2:** inspect seed markets and market types.
- **Day 3:** run unit tests and explain the market engine in your own words.
- **Day 4–5:** connect the market engine to the UI and verify one YES trade manually.
- **Day 6–7:** write down what is still confusing and ask your AI assistant for explanations with exact file references.
- **Day 8–10:** complete NO trade, portfolio, and simulated settlement flows.
- **Day 11–14:** add learning callouts and run E2E/manual QA.
- **Day 15–18:** try the mock wallet, polish docs, and prepare portfolio notes.
- **Day 19–21:** run final checks and deploy or document the exact deployment blocker.

## Week 1 — Foundation and mechanics

- Read the README and safety scope.
- Start the Next.js app.
- Study `src/types/market.ts` and `src/data/markets.ts`.
- Implement or inspect `src/lib/market-engine.ts`.
- Run unit tests.

Exit criteria:

- `npm run test` passes.
- You can explain why buying YES changes the YES probability.
- You can explain why this is not a real exchange.

## Week 2 — Product flow

- Build or inspect the home market list.
- Build or inspect the market detail page.
- Use the trade panel with play credits.
- Resolve a demo market and read the simulated settlement explanation.

Exit criteria:

- You can complete market view → YES/NO choice → position/probability update → simulated settlement.
- You can point to the client-only state and pure domain logic.

## Week 3 — Wallet, quality, deployment, portfolio

- Try the mock wallet experiment.
- Read the vibe-coding and troubleshooting docs.
- Run lint, tests, build, and E2E.
- Deploy or prepare deployment notes.
- Write your portfolio explanation.

Exit criteria:

- `npm run lint`, `npm run test`, `npm run build`, and `npm run test:e2e` pass or any exact gap is documented.
- You can explain the safety boundaries and why mock wallet is the default.
