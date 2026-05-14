# Vibe-Coding Guide

Use this guide when building with an AI assistant. The point is not to paste one giant prompt. Work in small loops: ask, inspect, run, fix, explain.

## Loop

1. **State the tiny goal** — one feature or test at a time.
2. **Ask for a plan** — request files, functions, and acceptance checks.
3. **Implement** — let the assistant propose code, but inspect the diff.
4. **Run checks** — use npm scripts.
5. **Debug with evidence** — paste exact error output.
6. **Ask for explanation** — make sure you can describe the change.

## Starter prompts

### Scaffold

```text
Create a beginner-friendly Next.js App Router structure for this PRD. Keep real money, mainnet, and financial advice out of scope. Explain each generated file in one sentence.
```

### Market engine

```text
Implement pure TypeScript functions for a toy YES/NO probability model. Add unit tests for buying YES, buying NO, invalid stake, and simulated settlement. Do not add production exchange logic.
```

### UI

```text
Build a market detail page with a trade panel. Keep the UI Polymarket-inspired but do not copy brand assets or pixel-perfect layouts. Add learning callouts that explain the toy model.
```

### Debugging

```text
Here is the exact error output. Identify the likely root cause, the smallest fix, and which npm command I should rerun after the fix.
```

### Portfolio explanation

```text
Turn this project into a portfolio story for a beginner developer. Highlight architecture, safety boundaries, tests, and what is intentionally out of scope.
```

## Testing prompts

```text
Write Vitest tests for this pure function before changing UI code. Cover the happy path, invalid inputs, and one edge case. After the tests, explain what behavior each test protects.
```

```text
This E2E test failed. Here is the Playwright error and the visible UI text. Diagnose whether the selector is wrong, the UI behavior is wrong, or the test expectation is too broad.
```

## Documentation prompts

```text
Update the beginner docs for this feature. Include: what changed, why it matters, the command to verify it, and one common mistake a learner might make.
```

## Deployment prompts

```text
Review this README deployment section for a beginner using GitHub and Vercel. Check whether the build command, npm path, environment assumptions, and portfolio proof are clear.
```

## Paste exact evidence patterns

When debugging with AI, paste the exact evidence:

```text
Command: npm run build
Observed output:
<paste the first full error block>
Expected: production build succeeds
What changed right before this: <file or feature>
```

```text
Command: npm run test:e2e
Observed output:
<paste failing test name and locator error>
Browser state: <what you saw manually>
```

## Common AI mistakes to catch

- Adding real wallet dependencies when the task only needs the mock wallet.
- Using dollar signs or USD language instead of play credits.
- Calling the app a trading or betting product.
- Copying Polymarket branding instead of creating an inspired educational UI.
- Hiding errors by deleting tests instead of fixing behavior.
- Adding a database or auth flow before the beginner v1 needs it.

## Common errors by area

| Area | Common error | First check |
| --- | --- | --- |
| Scaffold | Next.js command fails | Node version is 20.9+ and `npm install` completed. |
| UI | Button test cannot find element | The visible button text changed or the component is server-only by mistake. |
| Engine | Probability moves the wrong way | YES should increase the YES pool; NO should increase the NO pool. |
| Tests | Vitest import alias fails | Check `tsconfig.json` paths and `vitest.config.ts` alias. |
| Deploy | Vercel build fails | Re-run `npm run build` locally and compare the first TypeScript error. |
