import Link from "next/link";
import { calculateYesProbability } from "@/lib/market-engine";
import { formatCredits, formatProbability, formatShortDate } from "@/lib/format";
import type { Market } from "@/types/market";

interface MarketCardProps {
  market: Market;
}

export function MarketCard({ market }: MarketCardProps) {
  const yesProbability = calculateYesProbability(market);
  const statusLabel = market.status === "resolved" ? `Resolved ${market.resolvedOutcome?.toUpperCase()}` : "Open demo";

  return (
    <Link
      href={`/markets/${market.slug}`}
      className="group block rounded-3xl border border-white/10 bg-white/[0.06] p-5 transition hover:-translate-y-1 hover:border-cyan-200/50 hover:bg-white/[0.09]"
    >
      <div className="mb-4 flex items-center justify-between gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">
        <span>{market.category}</span>
        <span className="rounded-full bg-emerald-300/10 px-3 py-1 text-emerald-200">{statusLabel}</span>
      </div>
      <h2 className="mb-4 text-xl font-bold leading-tight text-white group-hover:text-cyan-100">{market.title}</h2>
      <p className="mb-5 line-clamp-3 text-sm leading-6 text-slate-300">{market.description}</p>
      <div className="grid grid-cols-3 gap-3 text-sm">
        <Metric label="YES" value={formatProbability(yesProbability)} />
        <Metric label="Volume" value={formatCredits(market.playVolume)} />
        <Metric label="Closes" value={formatShortDate(market.closesAt)} />
      </div>
    </Link>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-slate-950/40 p-3">
      <p className="text-[0.65rem] uppercase tracking-[0.2em] text-slate-400">{label}</p>
      <p className="mt-1 text-sm font-semibold text-white">{value}</p>
    </div>
  );
}
