import type { Market } from "@/types/market";

export const seedMarkets: Market[] = [
  {
    slug: "ai-assistant-weekly-coding",
    title: "Will AI assistants become a default coding tool for beginners this year?",
    description:
      "A learning market about whether AI-assisted development becomes a normal first step for new developers. This is a play-credit simulation, not advice.",
    category: "AI & Education",
    closesAt: "2026-06-30",
    status: "open",
    yesPool: 58,
    noPool: 42,
    playVolume: 1240,
    learningGoal: "See how buying YES nudges a simplified probability upward.",
  },
  {
    slug: "nextjs-beginner-deploy",
    title: "Will every learner deploy their app by the end of week 3?",
    description:
      "A project-progress market used to explain how predictions can represent confidence about a future outcome.",
    category: "Project Milestone",
    closesAt: "2026-07-07",
    status: "open",
    yesPool: 64,
    noPool: 36,
    playVolume: 980,
    learningGoal: "Use play credits to model confidence about a team milestone.",
  },
  {
    slug: "demo-settled-market",
    title: "Demo resolved market: did the sample feature ship?",
    description:
      "A safe resolved example for learning settlement. It demonstrates play-credit payout mechanics without real assets.",
    category: "Settlement Demo",
    closesAt: "2026-05-01",
    status: "resolved",
    yesPool: 72,
    noPool: 28,
    playVolume: 760,
    resolvedOutcome: "yes",
    learningGoal: "Inspect how simulated settlement marks a winning outcome.",
  },
];

export function getMarketBySlug(slug: string): Market | undefined {
  return seedMarkets.find((market) => market.slug === slug);
}
