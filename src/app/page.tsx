import { MarketCard } from "@/components/market/MarketCard";
import { seedMarkets } from "@/data/markets";

export default function Home() {
  return (
    <main className="mx-auto min-h-screen max-w-7xl px-6 py-10 md:py-14">
      <section className="mb-10 rounded-[2rem] border border-white/10 bg-white/[0.06] p-8 shadow-2xl shadow-slate-950/30">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-200">Simulation-only clone-coding lab</p>
        <h1 className="mt-4 max-w-4xl text-4xl font-black leading-tight text-white md:text-6xl">
          Learn prediction-market mechanics without real money or mainnet risk.
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
          Polymarket Mechanics Lab is a beginner-friendly, Polymarket-inspired project. You will explore markets, choose YES
          or NO with play credits, watch probabilities move, inspect simulated settlement, and try a safe mock wallet
          experiment.
        </p>
        <div className="mt-6 grid gap-3 text-sm md:grid-cols-3">
          <Badge>3-week beginner path</Badge>
          <Badge>No mainnet or real trading</Badge>
          <Badge>Built for vibe-coding practice</Badge>
        </div>
      </section>
      <section aria-labelledby="markets-heading">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-slate-400">Seeded demo markets</p>
            <h2 id="markets-heading" className="mt-2 text-3xl font-black text-white">
              Choose a learning market
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-slate-400">
            This app is not affiliated with Polymarket and does not use Polymarket logos, brand assets, real money, or
            investment advice.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {seedMarkets.map((market) => (
            <MarketCard key={market.slug} market={market} />
          ))}
        </div>
      </section>
    </main>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return <span className="rounded-full border border-cyan-200/20 bg-cyan-200/10 px-4 py-2 font-semibold text-cyan-50">{children}</span>;
}
