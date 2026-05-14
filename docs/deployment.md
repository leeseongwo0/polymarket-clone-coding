# Deployment Guide

This project is designed for a beginner-friendly Vercel deployment using npm.

## Before deploying

Run these locally:

```bash
npm run lint
npm run test
npm run build
npm run test:e2e
```

If E2E is blocked, write down the exact blocker before sharing the project.

## GitHub path

1. Create a GitHub repository.
2. Push this project.
3. Confirm `package.json` includes these scripts: `dev`, `build`, `start`, `lint`, `test`, `test:e2e`.
4. Confirm the README says this is simulation-only and not affiliated with Polymarket.

## Vercel path

1. Open Vercel and choose **Add New Project**.
2. Import the GitHub repository.
3. Framework preset: **Next.js**.
4. Package manager: **npm**.
5. Build command: `npm run build`.
6. Output directory: leave the Next.js default.
7. Deploy.

## Portfolio proof to save

- Deployed URL.
- Screenshot of the market detail page after a simulated YES or NO trade.
- Screenshot or notes from the mock wallet experiment.
- Command outputs for lint, test, build, and E2E.
- A short note that the app uses play credits only and has no real money/mainnet behavior.
