# Troubleshooting

## `npm install` fails

- Confirm Node.js is 20.9 or newer with `node --version`.
- Delete `node_modules` and `package-lock.json`, then retry `npm install`.

## Dev server does not start

- Check whether another process is using port 3000.
- Try `npm run dev -- --port 3001`.

## Unit tests fail

- Read the first failing test.
- Check whether `src/lib/market-engine.ts` changed.
- Ask your AI assistant to explain the expected invariant before changing code.

## E2E tests fail

- Install Chromium once with `npx playwright install chromium`.
- Run `npm run dev` manually and check the app.
- Then retry `npm run test:e2e`.

## Build fails

- Run `npm run lint` and `npm run test` first.
- Read TypeScript errors from `npm run build`.
- Fix the earliest error before chasing later errors.

## Deployment fails

- Confirm the build command is `npm run build`.
- Confirm Vercel is using npm and the same Node major version.
- Re-run `npm run build` locally and compare errors.
